import AWS from 'aws-sdk';

AWS.config.update({ region: 'us-east-1' });

export const SNS = process.env.IS_OFFLINE
  ? new AWS.SNS({
      endpoint: 'http://127.0.0.1:4002',
      region: 'us-east-1',
    })
  : new AWS.SNS();

export const publishToQueue = (queue: string, message: any) =>
  new Promise((resolve, reject) => {
    SNS.publish(
      {
        Message: JSON.stringify(message),
        TopicArn: process.env.IS_OFFLINE
          ? `arn:aws:sns:us-east-1:123456789012:${queue}`
          : `arn:aws:sns:us-east-1:444098062489:${queue}`,
      },
      err => {
        if (err) reject(err);
        resolve();
      },
    );
  });
