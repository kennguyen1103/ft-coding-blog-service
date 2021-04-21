import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Blog {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  url: string;
}
