const { MongoClient } = require("mongodb");
const uri = require("./atlas_uri");
console.log(uri);
const client = new MongoClient(uri);
const dbname = "bank";
const collection_name = "accounts";

const accountCollection = client.db(dbname).collection(collection_name);

const sampleAccount = {
  account_holder: "abdo mamdouh",
  account_id: "abcdefg",
  account_type: "checking",
  balance: 1234,
  last_updated: new Date(),
};

const connectToDatebase = async () => {
  try {
    await client.connect();
    console.log(`connected to the ${dbname} database`);
  } catch (err) {
    console.log("Error connecting to the database: ", err);
  }
};
const main = async () => {
  await connectToDatebase();
};
// const main = async () => {
//   try {
//     await connectToDatebase();
//     const accounts = client.db("bank").collection("accounts");
//     const transfers = client.db("bank").collection("transfers");

//     // Account information
//     let account_id_sender = "MDB574189300";
//     let account_id_receiver = "MDB343652528";
//     let transaction_amount = 100;
//     const session = client.startSession();
//     try {
//       const transactionResults = await session.withTransaction(async () => {
//         const senderUpdate = await accounts.updateOne(
//           { account_id: account_id_sender },
//           { $inc: { balance: -transaction_amount } },
//           { session }
//         );
//         const receiverUpdate = await accounts.updateOne(
//           { account_id: account_id_receiver },
//           { $inc: { balance: transaction_amount } },
//           { session }
//         );
//         const transfer = {
//           transfer_id: "TR21872187",
//           amount: 100,
//           from_account: account_id_sender,
//           to_account: account_id_receiver,
//         };

//         const insertTransferResults = await transfers.insertOne(transfer, {
//           session,
//         });
//         const updateSenderTransferResults = await accounts.updateOne(
//           { account_id: account_id_sender },
//           { $push: { transfers_complete: transfer.transfer_id } },
//           { session }
//         );
//         const updateReceiverTransferResults = await accounts.updateOne(
//           { account_id: account_id_receiver },
//           { $push: { transfers_complete: transfer.transfer_id } },
//           { session }
//         );
//         if (transactionResults) {
//           console.log("Transaction completed successfully.");
//         } else {
//           console.log("Transaction failed.");
//         }
//       });
//     } catch (err) {
//       console.error(`Transaction aborted: ${err}`);
//       process.exit(1);
//     } finally {
//       await session.endSession();
//       await client.close();
//     }
//   } catch (err) {
//     console.log(err);
//   } finally {
//     await client.close();
//   }
// };
main();
