import { FirehoseClient, PutRecordCommand } from "@aws-sdk/client-firehose";

const client = new FirehoseClient({ region: "us-west-2" });

const command = new PutRecordCommand({
  DeliveryStreamName: "testData",
  Record: {
    Data: Buffer.from(
      JSON.stringify({ name: `randomName`, email: `randomEmail` }) + "\n"
    ),
  },
});

const sentToFirehose = async () => {
  try {
    const kevin = await client.send(command);
    console.log("sent");
    console.log(kevin);
    return true;
  } catch (e) {
    console.log("error");
    return false;
  }
};

sentToFirehose();
