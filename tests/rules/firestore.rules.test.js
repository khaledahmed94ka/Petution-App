// @vitest-environment node
// Checks firestore.rules against the Firestore emulator.
// Run with `npm run test:emulator` (needs Java). Skipped when the emulator isn't running.
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { readFileSync } from 'fs';
import { initializeTestEnvironment, assertSucceeds, assertFails } from '@firebase/rules-unit-testing';
import {
  doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, writeBatch,
  collection, collectionGroup, query, where, increment, setLogLevel
} from 'firebase/firestore';

// Denied writes are expected here; don't flood the output with the SDK's warnings.
setLogLevel('silent');

const emulatorHost = process.env.FIRESTORE_EMULATOR_HOST;
const CLINIC = 'clinic-a';
const OTHER_CLINIC = 'clinic-b';

describe.skipIf(!emulatorHost)('firestore.rules', () => {
  let env;

  const as = (uid, { email = `${uid}@example.com`, verified = true } = {}) =>
    env.authenticatedContext(uid, { email, email_verified: verified }).firestore();
  const visitor = () => env.unauthenticatedContext().firestore();

  const seed = (writes) => env.withSecurityRulesDisabled(async (context) => {
    const db = context.firestore();
    for (const [path, data] of writes) await setDoc(doc(db, path), data);
  });

  const member = (uid, role, clinicId = CLINIC) =>
    [`clinics/${clinicId}/members/${uid}`, { uid, clinicId, role, email: `${uid}@example.com` }];

  beforeAll(async () => {
    const [host, port] = emulatorHost.split(':');
    env = await initializeTestEnvironment({
      projectId: process.env.GCLOUD_PROJECT || 'demo-petution',
      firestore: { rules: readFileSync('firestore.rules', 'utf8'), host, port: Number(port) }
    });
  });

  afterAll(async () => {
    await env?.cleanup();
  });

  beforeEach(async () => {
    await env.clearFirestore();
    await seed([
      [`clinics/${CLINIC}`, { name: 'Clinic A', ownerUid: 'owner' }],
      member('owner', 'Owner'),
      member('coowner', 'Owner'),
      member('admin', 'Admin'),
      member('vet', 'Vet'),
      member('reception', 'Receptionist'),
      [`clinics/${CLINIC}/clients/c1`, { name: 'Private client' }],
      [`clinics/${CLINIC}/products/p1`, { name: 'Vaccine', pricePerUnit: 350, quantity: 10 }],
      [`clinics/${CLINIC}/expenses/e1`, { amount: 100 }],
      [`clinics/${CLINIC}/settings/global`, { orgName: 'Clinic A' }],
      [`clinics/${OTHER_CLINIC}`, { name: 'Clinic B', ownerUid: 'otherowner' }],
      member('otherowner', 'Owner', OTHER_CLINIC),
      [`clinics/${OTHER_CLINIC}/clients/c9`, { name: 'Other clinic client' }]
    ]);
  });

  describe('creating a clinic', () => {
    it('a user can create a clinic with themselves as owner in one batch', async () => {
      const db = as('newbie');
      const batch = writeBatch(db);
      batch.set(doc(db, 'clinics/new-clinic'), { name: 'New', ownerUid: 'newbie' });
      batch.set(doc(db, 'clinics/new-clinic/members/newbie'), { uid: 'newbie', clinicId: 'new-clinic', role: 'Owner' });
      batch.set(doc(db, 'clinics/new-clinic/settings/global'), { orgName: 'New' });
      await assertSucceeds(batch.commit());
    });

    it('nobody can create a clinic for someone else or join one as its owner', async () => {
      await assertFails(setDoc(doc(as('newbie'), 'clinics/x'), { name: 'X', ownerUid: 'someone-else' }));
      await assertFails(setDoc(doc(as('intruder'), `clinics/${CLINIC}/members/intruder`), { uid: 'intruder', clinicId: CLINIC, role: 'Owner' }));
      await assertFails(setDoc(doc(as('intruder'), `clinics/${CLINIC}/members/intruder`), { uid: 'intruder', clinicId: CLINIC, role: 'Receptionist' }));
    });
  });

  describe('clinic isolation', () => {
    it('non-members and visitors can\'t read or write a clinic', async () => {
      await assertFails(getDoc(doc(as('otherowner'), `clinics/${CLINIC}/clients/c1`)));
      await assertFails(getDocs(collection(as('otherowner'), `clinics/${CLINIC}/clients`)));
      await assertFails(setDoc(doc(as('otherowner'), `clinics/${CLINIC}/clients/x`), { name: 'x' }));
      await assertFails(getDoc(doc(visitor(), `clinics/${CLINIC}/clients/c1`)));
      await assertFails(getDoc(doc(as('owner'), `clinics/${OTHER_CLINIC}/clients/c9`)));
    });

    it('members only see their own memberships across clinics', async () => {
      const mine = await assertSucceeds(getDocs(query(collectionGroup(as('vet'), 'members'), where('uid', '==', 'vet'))));
      expect(mine.docs.map(d => d.ref.path)).toEqual([`clinics/${CLINIC}/members/vet`]);
      await assertFails(getDocs(query(collectionGroup(as('vet'), 'members'), where('uid', '==', 'owner'))));
    });

    it('per-user legacy data stays private', async () => {
      await assertSucceeds(setDoc(doc(as('vet'), 'users/vet/clients/old'), { name: 'Old' }));
      await assertFails(getDoc(doc(as('owner'), 'users/vet/clients/old')));
    });
  });

  describe('roles', () => {
    it('every member can list the clinic\'s records (what the app\'s live listeners do)', async () => {
      for (const uid of ['owner', 'admin', 'vet', 'reception']) {
        for (const name of ['clients', 'pets', 'visits', 'products', 'invoices', 'vaccines', 'soapNotes', 'reminders', 'stockLogs', 'notifications', 'settings', 'members']) {
          await assertSucceeds(getDocs(collection(as(uid), `clinics/${CLINIC}/${name}`)));
        }
      }
      await assertSucceeds(getDocs(collection(as('admin'), `clinics/${CLINIC}/expenses`)));
    });

    it('everyone can work with clients, pets, visits and invoices', async () => {
      for (const uid of ['owner', 'admin', 'vet', 'reception']) {
        await assertSucceeds(setDoc(doc(as(uid), `clinics/${CLINIC}/clients/by-${uid}`), { name: uid }));
        await assertSucceeds(setDoc(doc(as(uid), `clinics/${CLINIC}/invoices/by-${uid}`), { total: 1 }));
      }
    });

    it('only owners and vets write medical records', async () => {
      await assertSucceeds(setDoc(doc(as('vet'), `clinics/${CLINIC}/soapNotes/s1`), { plan: 'x' }));
      await assertSucceeds(setDoc(doc(as('owner'), `clinics/${CLINIC}/vaccines/v1`), { name: 'x' }));
      await assertFails(setDoc(doc(as('reception'), `clinics/${CLINIC}/soapNotes/s2`), { plan: 'x' }));
      await assertFails(setDoc(doc(as('admin'), `clinics/${CLINIC}/vaccines/v2`), { name: 'x' }));
      await assertSucceeds(getDoc(doc(as('reception'), `clinics/${CLINIC}/soapNotes/s1`)));
    });

    it('only owners and admins manage products; anyone may change stock quantity alone', async () => {
      await assertSucceeds(setDoc(doc(as('admin'), `clinics/${CLINIC}/products/p2`), { name: 'New', pricePerUnit: 1, quantity: 1 }));
      await assertFails(setDoc(doc(as('reception'), `clinics/${CLINIC}/products/p3`), { name: 'New', quantity: 1 }));
      await assertFails(updateDoc(doc(as('reception'), `clinics/${CLINIC}/products/p1`), { pricePerUnit: 1 }));
      await assertFails(updateDoc(doc(as('vet'), `clinics/${CLINIC}/products/p1`), { quantity: increment(-1), pricePerUnit: 1 }));
      await assertSucceeds(updateDoc(doc(as('reception'), `clinics/${CLINIC}/products/p1`), { quantity: increment(-2) }));
      await assertFails(deleteDoc(doc(as('vet'), `clinics/${CLINIC}/products/p1`)));
    });

    it('expenses are visible to owners and admins only', async () => {
      await assertSucceeds(getDoc(doc(as('admin'), `clinics/${CLINIC}/expenses/e1`)));
      await assertFails(getDoc(doc(as('vet'), `clinics/${CLINIC}/expenses/e1`)));
      await assertFails(getDocs(collection(as('reception'), `clinics/${CLINIC}/expenses`)));
      await assertFails(setDoc(doc(as('vet'), `clinics/${CLINIC}/expenses/e2`), { amount: 1 }));
    });

    it('only owners change clinic settings', async () => {
      await assertSucceeds(updateDoc(doc(as('owner'), `clinics/${CLINIC}/settings/global`), { orgName: 'Renamed' }));
      await assertFails(updateDoc(doc(as('admin'), `clinics/${CLINIC}/settings/global`), { orgName: 'Hijacked' }));
      await assertFails(updateDoc(doc(as('admin'), `clinics/${CLINIC}`), { name: 'Hijacked' }));
    });

    it('owners manage roles; nobody promotes themselves or touches the founding owner', async () => {
      await assertSucceeds(updateDoc(doc(as('owner'), `clinics/${CLINIC}/members/vet`), { role: 'Admin' }));
      await assertFails(updateDoc(doc(as('reception'), `clinics/${CLINIC}/members/reception`), { role: 'Owner' }));
      await assertFails(updateDoc(doc(as('admin'), `clinics/${CLINIC}/members/reception`), { role: 'Admin' }));
      await assertFails(updateDoc(doc(as('coowner'), `clinics/${CLINIC}/members/owner`), { role: 'Receptionist' }));
      await assertFails(deleteDoc(doc(as('coowner'), `clinics/${CLINIC}/members/owner`)));
      await assertSucceeds(deleteDoc(doc(as('owner'), `clinics/${CLINIC}/members/reception`)));
      await assertFails(getDoc(doc(as('reception'), `clinics/${CLINIC}/clients/c1`)));
    });

    it('members can leave; the founding owner only after deleting the clinic', async () => {
      await assertSucceeds(deleteDoc(doc(as('vet'), `clinics/${CLINIC}/members/vet`)));
      await assertFails(deleteDoc(doc(as('owner'), `clinics/${CLINIC}/members/owner`)));
      await assertFails(deleteDoc(doc(as('coowner'), `clinics/${CLINIC}`)));
      await assertSucceeds(deleteDoc(doc(as('owner'), `clinics/${CLINIC}`)));
      await assertSucceeds(deleteDoc(doc(as('owner'), `clinics/${CLINIC}/members/owner`)));
    });
  });

  describe('invitations', () => {
    const invite = { clinicId: CLINIC, clinicName: 'Clinic A', email: 'new.vet@example.com', role: 'Vet', status: 'pending' };

    const accept = (db, uid, inviteId = 'inv1', role = 'Vet') => {
      const batch = writeBatch(db);
      batch.set(doc(db, `clinics/${CLINIC}/members/${uid}`), { uid, clinicId: CLINIC, role, inviteId });
      batch.update(doc(db, `invites/${inviteId}`), { status: 'accepted', acceptedUid: uid, respondedTs: 1 });
      return batch.commit();
    };

    it('only owners invite, and only for their own clinic', async () => {
      await assertSucceeds(setDoc(doc(as('owner'), 'invites/inv1'), invite));
      await assertFails(setDoc(doc(as('admin'), 'invites/inv2'), invite));
      await assertFails(setDoc(doc(as('otherowner'), 'invites/inv3'), invite));
      await assertFails(setDoc(doc(as('owner'), 'invites/inv4'), { ...invite, email: 'Mixed@Example.com' }));
    });

    it('the invitee finds and accepts the invitation with a verified email', async () => {
      await seed([['invites/inv1', invite]]);
      const newVet = as('newvet', { email: 'new.vet@example.com' });
      const found = await assertSucceeds(getDocs(query(collection(newVet, 'invites'), where('email', '==', 'new.vet@example.com'), where('status', '==', 'pending'))));
      expect(found.size).toBe(1);
      await assertSucceeds(accept(newVet, 'newvet'));
      await assertSucceeds(getDoc(doc(newVet, `clinics/${CLINIC}/clients/c1`)));
      await assertFails(getDoc(doc(newVet, `clinics/${CLINIC}/expenses/e1`)));
    });

    it('rejects unverified emails, other people\'s invitations, and a different role', async () => {
      await seed([['invites/inv1', invite]]);
      await assertFails(accept(as('newvet', { email: 'new.vet@example.com', verified: false }), 'newvet'));
      // Joining without marking the invitation accepted in the same write is refused too.
      const membership = { uid: 'newvet', clinicId: CLINIC, role: 'Vet', inviteId: 'inv1' };
      await assertFails(setDoc(doc(as('newvet', { email: 'new.vet@example.com', verified: false }), `clinics/${CLINIC}/members/newvet`), membership));
      await assertFails(setDoc(doc(as('newvet', { email: 'new.vet@example.com' }), `clinics/${CLINIC}/members/newvet`), membership));
      await assertFails(accept(as('stranger', { email: 'stranger@example.com' }), 'stranger'));
      await assertFails(accept(as('newvet', { email: 'new.vet@example.com' }), 'newvet', 'inv1', 'Owner'));
      await assertFails(getDocs(query(collection(as('stranger'), 'invites'), where('email', '==', 'new.vet@example.com'))));
    });

    it('a used or declined invitation can\'t be used again', async () => {
      await seed([['invites/inv1', { ...invite, status: 'declined' }]]);
      await assertFails(accept(as('newvet', { email: 'new.vet@example.com' }), 'newvet'));
    });

    it('the invitee can decline; owners can list and withdraw their clinic\'s invitations', async () => {
      await seed([['invites/inv1', invite], ['invites/inv2', { ...invite, email: 'other@example.com' }]]);
      await assertSucceeds(updateDoc(doc(as('newvet', { email: 'new.vet@example.com' }), 'invites/inv1'), { status: 'declined', respondedTs: 1 }));
      const listed = await assertSucceeds(getDocs(query(collection(as('owner'), 'invites'), where('clinicId', '==', CLINIC))));
      expect(listed.size).toBe(2);
      await assertFails(getDocs(query(collection(as('reception'), 'invites'), where('clinicId', '==', CLINIC))));
      await assertSucceeds(deleteDoc(doc(as('owner'), 'invites/inv2')));
    });
  });
});
