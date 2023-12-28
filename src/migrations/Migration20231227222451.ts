import { Migration } from '@mikro-orm/migrations';

export class Migration20231227222451 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `account` (`id` varchar(255) not null, `name` varchar(255) not null, `balance` int not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists `account`;');
  }

}
