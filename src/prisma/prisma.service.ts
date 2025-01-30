import {
  INestApplication,
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// @Injectable()
// export class PrismaService extends PrismaClient implements OnModuleInit{
//     async onModuleInit(){
//         await this.$connect();
//     }

//     async enableShutdownHooks(app: INestApplication){
//         process.on('beforeExit', async () => {
//             await app.close();
//         });
//     }
// }

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

   //Terhubung ke database saat modul diinisialisasi.
    async onModuleInit() {
    await this.$connect();
  }

  //Memutus koneksi database saat modul dihancurkan.
  async onModuleDestroy() {
    await this.$disconnect();
  }

  async enableShutdownHooks(app: INestApplication) {
    //Mendengarkan sinyal SIGINT (Ctrl+C) untuk menghentikan aplikasi.
    process.on('SIGINT', async () => {
      await app.close();
      process.exit(0);
    });

    ////Mendengarkan sinyal SIGTERM (terminasi proses) untuk menghentikan aplikasi.
    process.on('SIGTERM', async () => {
      await app.close();
      process.exit(0);
    });
  }
}
