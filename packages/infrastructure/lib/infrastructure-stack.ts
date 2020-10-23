import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3Deploy from '@aws-cdk/aws-s3-deployment';
import * as route53 from '@aws-cdk/aws-route53';
import * as route53Targets from '@aws-cdk/aws-route53-targets';

interface StackProps extends cdk.StackProps {
  domainName: string;
}

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const domain = `kollektivet.${props.domainName}`

    const websiteBucket = new s3.Bucket(this, 'Bucket', {
      bucketName: domain,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html',
      publicReadAccess: true
    })

    const redirectBucket = new s3.Bucket(this, 'BucketRedirect', {
      bucketName: 'www.' + domain,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      publicReadAccess: true,
      websiteRedirect: { hostName: domain }
    })

    new s3Deploy.BucketDeployment(this, 'DeployWebsite', {
      sources: [s3Deploy.Source.asset('../frontend/build')],
      destinationBucket: websiteBucket,
      retainOnDelete: false
    })

    const zone = route53.HostedZone.fromLookup(this, 'zone-oskarssylwan.com', {
      domainName: props.domainName
    })

    new route53.ARecord(this, 'ARecord Frontend', {
      zone: zone,
      recordName: domain,
      target: route53.RecordTarget.fromAlias(new route53Targets.BucketWebsiteTarget(websiteBucket))
    })

    new route53.ARecord(this, 'ARecord-www Frontend', {
      zone: zone,
      recordName: 'www.' + domain,
      target: route53.RecordTarget.fromAlias(new route53Targets.BucketWebsiteTarget(redirectBucket))
    })

  }
}
