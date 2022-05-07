import { FirehoseClient, PutRecordCommand } from "@aws-sdk/client-firehose";
import { faker } from "@faker-js/faker";

const client = new FirehoseClient({ region: "" });

const randomName = faker.name.findName();
const randomEmail = faker.internet.email();
const command = new PutRecordCommand({
  DeliveryStreamName: "testData",
  Record: {
    Data: Buffer.from(
      JSON.stringify({ name: randomName, email: randomEmail }) + "\n"
    ),
  },
});

const sentToFirehose = async () => {
  try {
    await client.send(command);
    return true;
  } catch (e) {
    console.log("error");
    return false;
  }
};

sentToFirehose();
