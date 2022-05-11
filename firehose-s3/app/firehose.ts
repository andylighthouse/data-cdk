import { FirehoseClient, PutRecordCommand } from '@aws-sdk/client-firehose'

const client = new FirehoseClient({ region: 'us-west-2' })

const command = new PutRecordCommand({
  DeliveryStreamName: 'TestData',
  Record: {
    Data: Buffer.from(JSON.stringify({ name: `randomName`, email: `randomEmail` }) + '\n'),
  },
})

const sentToFirehose = async () => {
  try {
    await client.send(command)
    console.log('sent')
    return true
  } catch (e) {
    console.log('error')
    console.log(e)
    return false
  }
}

sentToFirehose()
