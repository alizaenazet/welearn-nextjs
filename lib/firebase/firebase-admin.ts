// import "server-only";

// import { cookies } from "next/headers";
// import { initializeApp, getApps, cert } from "firebase-admin/app";
// import { SessionCookieOptions, getAuth } from "firebase-admin/auth";


// export const firebaseApp =
//   getApps().find((it) => it.name === "firebase-admin-app") ||
//   initializeApp(
//     {
//       credential: cert(JSON.parse(process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT))
//     },
//     "firebase-admin-app"
//   );
// export const adminAuth = getAuth(firebaseApp);