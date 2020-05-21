const AWS = require('aws-sdk');

const sns = new AWS.SNS({
  endpoint: 'http://127.0.0.1:4002',
  region: 'us-east-1',
});

sns.publish(
  {
    Message: JSON.stringify({
      body: {
        algorithmId: '123',
      },
    }),
    TopicArn: 'arn:aws:sns:us-east-1:123456789012:create',
  },
  err => {
    console.log(err);
    console.log('ping');
  },
);
