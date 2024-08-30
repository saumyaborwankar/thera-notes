import { PutObjectCommand, S3, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
@Injectable()
export class S3Service {
  private readonly s3: S3;
  private processingBucketName: string;

  constructor() {
    this.s3 = new S3({ region: 'us-east-1', useAccelerateEndpoint: true });
    this.processingBucketName = 'moovy-processing-bucket';
  }

  public async getPresignedUrl(
    key,
    bucket = this.processingBucketName,
  ): Promise<string> {
    const command = new PutObjectCommand({ Bucket: bucket, Key: key });
    return getSignedUrl(this.s3, command, { expiresIn: 3600 });
  }
}
