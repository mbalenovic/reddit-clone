import { MigrationInterface, QueryRunner } from "typeorm";

export class FakePosts1761944638879 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
      insert into post (title, text, "authorId") values ('One Million B.C.', 'Adventure|Fantasy|Romance|Sci-Fi', 1);
insert into post (title, text, "authorId") values ('Burn', 'Documentary', 1);
insert into post (title, text, "authorId") values ('Randy Rides Alone', 'Western', 1);
insert into post (title, text, "authorId") values ('The Fool', 'Drama', 1);
insert into post (title, text, "authorId") values ('Kiss of the Vampire, The', 'Horror', 1);
insert into post (title, text, "authorId") values ('Buy the Ticket, Take the Ride: Hunter S. Thompson on Film', 'Documentary', 1);
insert into post (title, text, "authorId") values ('Hotel Terminus: The Life and Times of Klaus Barbie (Hôtel Terminus)', 'Documentary', 1);
insert into post (title, text, "authorId") values ('Budd Boetticher: A Man Can Do That', 'Documentary', 1);
insert into post (title, text, "authorId") values ('Snow Falling on Cedars', 'Drama', 1);
insert into post (title, text, "authorId") values ('Nomad (Köshpendiler)', 'Drama|War', 1);
insert into post (title, text, "authorId") values ('Ulzana''s Raid', 'Adventure|Western', 1);
insert into post (title, text, "authorId") values ('Vincent & Theo', 'Drama', 1);
insert into post (title, text, "authorId") values ('Crime and Punishment in Suburbia', 'Comedy|Drama', 1);
insert into post (title, text, "authorId") values ('Groundstar Conspiracy, The', 'Action|Crime|Mystery|Romance|Sci-Fi|Thriller', 1);
insert into post (title, text, "authorId") values ('Heart in Winter, A (Un coeur en hiver)', 'Drama|Romance', 1);
insert into post (title, text, "authorId") values ('Solyaris', 'Drama|Sci-Fi', 1);
insert into post (title, text, "authorId") values ('Funeral, The', 'Crime|Drama', 1);
insert into post (title, text, "authorId") values ('Vanishing, The (Spoorloos)', 'Drama|Thriller', 1);
insert into post (title, text, "authorId") values ('Medallion, The', 'Action|Comedy|Crime|Fantasy', 1);
insert into post (title, text, "authorId") values ('Without Pity', 'Crime|Drama', 1);
insert into post (title, text, "authorId") values ('Postman Blues', 'Action|Comedy|Crime|Drama', 1);
insert into post (title, text, "authorId") values ('Color of Night', 'Drama|Thriller', 1);
insert into post (title, text, "authorId") values ('Hi-Life', 'Comedy|Romance', 1);
insert into post (title, text, "authorId") values ('Tremors II: Aftershocks', 'Comedy|Horror|Sci-Fi', 1);
insert into post (title, text, "authorId") values ('Chop Shop', 'Drama', 1);
insert into post (title, text, "authorId") values ('Coriolanus', 'Drama|Thriller', 1);
insert into post (title, text, "authorId") values ('Kink', 'Documentary', 1);
insert into post (title, text, "authorId") values ('Money as Debt', 'Animation|Documentary', 1);
insert into post (title, text, "authorId") values ('Saint of Fort Washington, The', 'Drama', 1);
insert into post (title, text, "authorId") values ('Soul Man', 'Comedy', 1);
insert into post (title, text, "authorId") values ('Taxi Blues', 'Drama', 1);
insert into post (title, text, "authorId") values ('Night of the Demons 2', 'Horror', 1);
insert into post (title, text, "authorId") values ('Dangerous Liaisons', 'Drama|Mystery|Romance', 1);
insert into post (title, text, "authorId") values ('Freedomland', 'Crime|Drama', 1);
insert into post (title, text, "authorId") values ('Standing Still', 'Comedy|Drama|Romance', 1);
insert into post (title, text, "authorId") values ('Flicker', 'Horror', 1);
insert into post (title, text, "authorId") values ('Blissfully Yours (Sud sanaeha)', 'Drama|Romance', 1);
insert into post (title, text, "authorId") values ('Hercules and the Amazon Women', 'Action|Adventure|Fantasy|Sci-Fi', 1);
insert into post (title, text, "authorId") values ('Cousins in Love (a.k.a. Tender Cousins) (Tendres Cousines)', 'Drama|Romance', 1);
insert into post (title, text, "authorId") values ('Look Who''s Talking', 'Comedy|Romance', 1);
insert into post (title, text, "authorId") values ('Missing Star, The (La stella che non c''è)', 'Drama', 1);
insert into post (title, text, "authorId") values ('Bread and Chocolate (Pane e cioccolata)', 'Comedy|Drama', 1);
insert into post (title, text, "authorId") values ('Monty Python: Almost the Truth - Lawyers Cut', 'Comedy|Documentary', 1);
insert into post (title, text, "authorId") values ('American Addict', 'Documentary', 1);
insert into post (title, text, "authorId") values ('Flock of Dodos: The Evolution-Intelligent Design Circus', 'Documentary', 1);
insert into post (title, text, "authorId") values ('Embodiment of Evil (Encarnação do Demônio)', 'Mystery', 1);
insert into post (title, text, "authorId") values ('Satan Met a Lady', 'Comedy|Drama|Mystery', 1);
insert into post (title, text, "authorId") values ('Poolhall Junkies', 'Comedy|Drama|Thriller', 1);
insert into post (title, text, "authorId") values ('Family Plot', 'Comedy|Thriller', 1);
insert into post (title, text, "authorId") values ('Newest Pledge, The', 'Comedy', 1);
`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
