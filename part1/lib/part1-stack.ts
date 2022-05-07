import {
  aws_kinesisfirehose as kinesisfirehose,
  aws_s3 as s3,
  Stack,
  StackProps,
} from "aws-cdk-lib";
import { PolicyStatement, Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

export class FirehoseToS3 extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Create a S3 bucket
    const bucket = new s3.Bucket(this, "MYRAWBUCKET", {
      bucketName: "dongguangkevinsbucket",
    });

    // Create IAM role for firehose to access S3
    const firehoseRole = new Role(this, "FIREHOSEACCESSS3", {
      assumedBy: new ServicePrincipal("firehose.amazonaws.com"),
    });

    firehoseRole.addToPolicy(
      new PolicyStatement({
        resources: [bucket.bucketArn, bucket.arnForObjects("*")],
        actions: ["s3:PutObject"],
      })
    );

    const firehose = new kinesisfirehose.CfnDeliveryStream(
      this,
      "FirehoseToS3",
      {
        deliveryStreamName: "testData",
        s3DestinationConfiguration: {
          bucketArn: bucket.bucketArn,
          roleArn: firehoseRole.roleArn,
          bufferingHints: {
            intervalInSeconds: 60,
            sizeInMBs: 128,
          },
          compressionFormat: "GZIP",
          prefix: "test-raw/",
          // CloudWatchLoggingOptionss: CloudWatchLoggingOptions,
          // EncryptionConfiguration: EncryptionConfiguration,
          // ErrorOutputPrefix: String,
        },
      }
    );
  }
}
