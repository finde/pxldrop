import { Module } from '@nestjs/common';
import { GoogleDriveModule, GoogleDriveConfig } from 'nestjs-googledrive-upload';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

// folderID =  19eTgpP7Qwbly2o4C4VpAcwRsrMRZX2aT
const config = {
  type: 'service_account',
  project_id: 'web-photo-drop',
  private_key_id: '9fe6ebbbdcc2741a69ee69f53f2d5d2caac72966',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCeJqlHAvrUv8y0\n7oU+No5mMhevOcuEsoM0dVyaHGB5gxTPbg0k8C/mebeOFQioMDAizCwFQoyH4oK8\n3ewB6GyK/+c8qZIaZY8oTNgXd5NxlnCQOv3hLU8WMaqRuK6vfHytRc2Un0jqOA9k\nv1jQ2WwW28pJ1WFty9uS72Y0EA1l4n+oZg/ezkoNwDQjJxdWPDqZeKbjj6SRmiEE\nuEidKfeOY6fTKhC+zmVkW/USzAN+VXcCRHokpO4m/CKZvVv+ZywnfVexP+g5lS6w\n+bdBTkgPJZou7MjJ+1fvfgWcvSJSAUHrtUHtXlEDECoDCoHRycnn31zYegCUk+u6\n4nPCBKeTAgMBAAECggEAFN0EJIJnyrHeydj+1Ofnkzh1LWrncVhcvLU62SMjNa8t\ni0vOX3AcMZXJuZcGxFakaFgc+o3+nLKCDXO3/cHGsp5Icr/qrqF1PZty6m2ePYmG\nIfuA9eK/Sy3pfZMqiwCrhe7udvZ9wlWmROPao0/7gBcmBuV9Fo9NJoN/LSEXqLf/\n2EyQ9XoCa7waB/uVy1QKLxfVNEu9Vfe5d6P3i5Hc+pjV9zy4nSCVSXo7bns4u+W1\n5NO6W2/YWI8EI8oBxvdclQoElwGFNZs0Ei8w4vAVvxFIA3nSA7HkUhoJbMPiWo3G\n/OplSOqlHva3O+O7lZl4KaBZHxPUAR8TqqYBstf4qQKBgQDPYWkaveAx95EGUmzR\nivx23veZzHrOM4tg0jfod1BcKReG9lXCL5fczhFt5MUSclCVQS0kO3HXsMwB+TTP\nnnYD2PrpyPwSQVkM0E+BzCXyoU/f7SqId9WbTspg/Hy8QAyQFP8RUbYYBg8SO0YP\nnZ3CuZUvIZ4dD5F9bVcFlllIFQKBgQDDOpbI6NHUSW8YN5XKImgeNBpVmgyMLELm\ntZe+DjgHEITa0ARylvSHrV8owF78cX/1O1LMHCmg913awztyQmWUE3LvNuB3qtJT\nKsgGMikNv4JGEtdl7iqXqh33tU4dVaGLBNpO8wJidETnf248m/5gS3rsqG4uNTeq\nm3f53bmzBwKBgQCXTWPIvfW/nvcxXJvGOhg+hiiyDm0e2p57EoT1129K/jQLJNim\n5+Btme8/dWSPM9Y1Pys3PyOtEXGWkwKD5AIIhptyTFAU5ZaZ8bXAZnjdT/Id10Rr\n8rpnKJIhNrWvBy/jQ15hfXNUjb8bNyHDrOR4OLxueaGJZF1q3IZcLjiPjQKBgQC1\n60mIi5LDW25fRaSZx7f3tRt4+uSIVdI9g6eTnVJOGvGBqGcMlGfmagKLSb75Q5Y1\n4QLFWdTcvsTBTj19uitHcVwfVqaSPCZjAzGCvIkO2468V2BKBkXAL/Be256frSSs\nE2iOOtnU/n0art79MWs3Nf6kukp5WnO10ctZlWguTwKBgFhAkYNcQDhB3XbSyUWI\nvwDbrXWm/2rt9ghT7N9TmHJXWXI27l6fk1rsXfawkeRsPdRyDg0AVTaKhdm17Cg8\nPVhaHHyyaqTdIsNIG3dmmKq5DdBpKO1ELPI+mWjSZk7g8KOccuJX00i9CiTlO5dw\nY+s83DpTkHDYxlLJbvTRlpYK\n-----END PRIVATE KEY-----\n',
  client_email: 'googledrive@web-photo-drop.iam.gserviceaccount.com',
  client_id: '117293284445923384277',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/googledrive%40web-photo-drop.iam.gserviceaccount.com',
  universe_domain: 'googleapis.com',
};

@Module({
  imports: [
    GoogleDriveModule.register(
      config as GoogleDriveConfig,
      '19eTgpP7Qwbly2o4C4VpAcwRsrMRZX2aT'
    ),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend'),
      exclude: ['/api*'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
