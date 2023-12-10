// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import crypto from "crypto";
import eccrypto from 'eccrypto';

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // A new random 32-byte private key.
  var privateKey = eccrypto.generatePrivate();
// Corresponding uncompressed (65-byte) public key.
  var publicKey = eccrypto.getPublic(privateKey);

  var str = "message to sign";
// Always hash you message to sign!
  var msg = crypto.createHash("sha256").update(str).digest();

  eccrypto.sign(privateKey, msg).then(function (sig) {
    console.log("Signature in DER format:", sig);
    eccrypto.verify(publicKey, msg, sig).then(function () {
      console.log("Signature is OK");
    }).catch(function () {
      console.log("Signature is BAD");
    });
  });

  res.status(200).json({ name: 'John Doe' })
}
