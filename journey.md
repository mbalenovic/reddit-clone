### Tutorials Mentioned

- [TypeGraphQL Getting Started](https://typegraphql.com/docs/getting-started.html#:~:text=Boolean!%0A%7D-,Want%20more%3F,-That%20was%20only)
- [React TypeScript Cheatsheet Examples](https://react-typescript-cheatsheet.netlify.app/docs/basic/examples)

---

### Progress Log

#### September 28

- **1h (12:50)**:
  - Initialized `tsconfig` using `pnpm tsc --init`.

#### September 29

- **2.5h (33:49)**:
  - **Issue**: MikroORM entities not automatically imported under `entities`.  
    **Solution**: Used explicit entity imports.
  - **Issue**: `orm.em.create(Post)` missing `createdAt` and `updatedAt`.  
    **Solution**: Added them as `OptionalProps` in `BaseEntity`.
  - **Insight**: `orm.em.fork()` creates a new `EntityManager` instance instead of reusing the global one.  
    **Note**: Not using `fork` could lead to returning cached, incorrect data.

#### September 30

- **3h (1:00:38)**:
  - **Issue**: `insert into "post"` failed because relation `"post"` didn't exist.  
    **Solution**: Dropped tables and recreated them.
  - **Issue**: `process.env.DB_PASSWORD` was `undefined`.  
    **Actionable**: Fix `.env` file.
  - Narrowed `MikroORM.init()` parameter types using `Parameters<typeof MikroOrm.init>[0]`.
  - Ran `npx mikro-orm migration:create` but encountered issues due to incorrect paths and directory.
  - Learned that `flush()` writes to the database, while `persist()` only marks entities for flushing.

#### October 1

- **3h (1:32:47)**:
  - **Issue**: Can't return user at the end of the login mutation  
    **Solution**: Pay attention to the UserResponse type, user is within an object
  - Reminder to add new entities to mikro-orm.config.ts
  - Reminder to add new resolvers to buildSchema
  - Learned that node-argon2 should be used for hashing password, and bcrypt only in legacy systems where argon2 and scrypt arent available [OWASP cheatsheet](https://cheatsheetseries.owasp.org/index.html)

#### October 2

- **3h (2:08:23)**:
  - **Issue**: No errors returned when testing invalid usernames  
    **Solution**: Add the response format to the mutation
  - Learned a convienient input validation [class-validator](https://typegraphql.com/docs/validation.html)
  - Learned how to setup Redis for session [connect-redis](https://www.npmjs.com/package/connect-redis). Other stores [expressjs-session](https://github.com/expressjs/session#compatible-session-stores)

#### October 3

- **1h (2:17:07)**:
  - Learned about NextJS

#### October 4

- **4h (2:25:39)**:

  - Learned that the tech shifted towards other solutions and that the line between fe and be is blured. To continue with the tutorial, I've decided to use React + TanStack Router
  - Set up registration

#### October 5

- **1h (2:46:01)**:
  - Got a confirmation for how to handle cors on backend (app.use(origin, credentials))
  - Learned about GraphQL errors and handling

#### October 6

- **2h40m (3:06:02)**:
- graphql codemod doesn't generate hooks anymore, but a wrapper around graphql client that contains the types (https://the-guild.dev/graphql/codegen/docs/guides/react-vue)

#### October 7

- **2h20m (3:24:35)**:
- Learned that it's best to use a lib for forms, there's too much work with native html with validation and error handling.
- TanStack Route Routes have .to property

#### October 11

- **45m (3:24:35)**:
- Read about authentication [TanStack](https://tanstack.com/router/v1/docs/framework/react/how-to/setup-authentication)

#### October 12

- **2h45m (3:38:43)**:
- Set the authentication

#### October 13

- **3h (3:54:53)**:
- Types missing when using Fragments. Codegen.ts was configured to scan .tsx only, and Fragment was .ts.
- Backend logout done with clearing cookie and deleting session
- Removed fragment masking in Codegen.ts
- Stuck a bit on calling navigate/redirect in auth.logout, but it's outside the router context

#### October 14

- **1.5h (4:18:29)**:
- Right click -> View Page Source to examin the page for SEO
- We can know if we're on the server if the window object is undefined
- Nodemailer for emails

#### October 15

- **5h (5:22:16)**:
- Custom backend validation is done on InputType(), not ObjectType() - e.g. username special chars validation
- GraphQL generates client types based on schema from the url to graphql server
- Ben replaced redis with ioredis, but I'll keep connect-redis for now
- For Redis debugging: redis-cli and run KEYS \*

#### October 16

- **2.5h (5:50:46)**:
- Switched to TypeORM. Updating column type could be dangerous. Some users state that migrations run DROP/CREATE column instead of MODIFY!
- DataMapper vs ActiveRecords - DataMapper is a better fit for larger apps

#### October 18

- **1.5h (5:50:46)**:

```
export class UserService {
  constructor(private AppDataSource: DataSource) {}
}
```

is equivalent to

```
export class UserService {
  private AppDataSource: DataSource;

  constructor(AppDataSource: DataSource) {
    this.AppDataSource = AppDataSource;
  }
}
```

- Handle errors:
  - in a service
  - in a resolver
  - in a middleware

#### October 19

- **1h (5:50:46)**:
- ErrorInterceptor middleware

#### October 20

- **1.5h 6:02:35**:
- Classes:
  - abstract - can't instantiate, only extend
  - super - calls the parent class's constructor
  - `new () => T` type signature of a class constructor; a function that returns a T when called with new.
  - override methods only to extend or specialize the base logic
- typeorm remove() vs delete() - remove is slower, but safer and more consistent

#### October 21

- **1.5h 6:02:35**:
- added relationships [many-to-one](https://typeorm.io/docs/getting-started/#creating-a-many-to-one--one-to-many-relation)
- Auth middleware (error was caught in ErrorInterceptor middleware)

#### October 25

- **0.75h 6:13:23**:

#### October 26

- **3.5h 6:42:00**:
- TypeORM returns plain objects, not class instances. Updated the isUser type guard to validate shape existence, but it still misses type validation
  - some teams avoid using instanceof, and check for fields
  - tools like Zod give you a strong guarantees about shape and type (more important than instanceof)
- Apollo client cache invalidation after mutation:
  - codegen from @graphql-codegen returns typed wrapper object, and not a plain DocumentNode. That's why `refetchQueries: [{ query: POSTS }]` is used instead of `refetchQueries: [GET_POST, "GetComments"]`
  - opted for `update` function

#### October 27

- **1.5h 6:42:00**:
- Cursor pagination:

```
    if (cursor) {
      query.where({ createdAt: MoreThan(cursor) });
    }
```

#### October 28

- **0.7h 6:53:23**:
- updatedAt GraphQL type is GraphQLISODateTime instead of String
- generate mock data - [https://www.mockaroo.com/](https://www.mockaroo.com/)

#### October 31

- **1h 7:13:20**:

#### November 01

- **6h 8:18:50**:
- [https://www.apollographql.com/docs/graphos/schema-design/guides/relay-style-connections](https://www.apollographql.com/docs/graphos/schema-design/guides/relay-style-connections)
- shadcn Button prop asChild renders a child component (e.g. Link) with Button styles & behaviors
- Get an element type from array by using [number] for index e.g. `PostsQuery["posts"]["edges"][number]["node"]`
- Had an instict to add a subsequent query call instead of left joining two tables (post and user in getAllPosts)

#### November 02

- **1h 8:28:04**:

#### November 03

- **2.5h 8:57:25**:
- Using userId and postId as primary columns ensures no duplicates unlike using the additional PrimaryGeneratedColumn
- Many-to-many:
  - No extra fields => @ManyToMany + @JoinTable()
  - [With extra fields](https://typeorm.io/docs/relations/many-to-many-relations#many-to-many-relations-with-custom-properties) => Create a new entity and connect with @OneToMany / @ManyToOne
- [Transactions](https://typeorm.io/docs/advanced-topics/transactions/) - ensures the whole logic is one operation. If one of the operations fails, all fails.

#### November 04

- **2h 9:32:19**

#### November 05

- **0.5h 9:41:34**:

#### November 06

- **0.5h 9:41:34**:

#### November 18

- **5h 10:06:06**:
- Creating a virtual field in the data model (not stored in the database) and returning it:
- leftJoin doesn't select any columns from it (unline leftJoinAndSelect)
- addSelect - add an extra column to the already selected fields

```
    // Get raw + entities to attach voteStatus manually
    const rawAndEntities = await query.getRawAndEntities();

    return rawAndEntities.entities.map((post, i) => ({
      ...post,
      voteStatus: rawAndEntities.raw[i].voteStatus ?? null,
    }));
```

- Posts page was reloading because notifyOnNetworkStatusChange: true means more loading states. Fixed by changing the initial loading check (loading && !data) [Core API changes](https://www.apollographql.com/docs/react/migrating/apollo-client-4-migration#core-api-changes)

#### November 26

- **1h 10:14:42**:
- Got stuck a little bit cause findBy returns an array, but I needed one post. Should've used findOneBy
- post query doesn't return author's email cause @FieldResolver email checks for authenticated user match

#### November 30

- **2h 10:38:12**:
- Post remove failed cause its referenced from the table upvote. onDelete: "CASCADE" or delete upvotes before deleting the post

#### December 03

- **2.5h 11:14:28**:
- Fixed unstable AuthContext.Provider - early return when loading doesn't render AuthContext.
- Instead of .leftJoinAndSelect author or adding author as relations, we could just define a @FieldResolver, but it performs badly. N+1 problem (if there was 100 posts, it would run 100 SQL statements to get a creator). [third party dependency solution](https://www.npmjs.com/package/dataloader)

```
  @FieldResolver(() => User)
  author(@Root() post: Post, @Ctx() { userLoader }: Context) {
    return userLoader.load(post.authorId);
  }
```

#### December 21

- **1.5h 11:27:28**

#### December 26

- **1h 11:48:56**:
- ApolloClient client.resetStore() on login/logout to clear the cache and reexecute all the active queries

#### December 27

- **3h 12:22:56**:
- Issue with building the container [forum](https://forums.docker.com/t/docker-credential-desktop-exe-executable-file-not-found-in-path-using-wsl2/100225)
- The second issue was "tsc not found" during build. The issue was missing typescript devDependency.
- The third issue was creating initial migration. The final command was `npx typeorm-ts-node-commonjs migration:generate ./src/migrations/InitialMigration -d ./src/typeorm.config.ts` and it required process.env.DB_URL replaced with the string, synchronize turned off, and a fresh database without tables.
- Added `app.set("trust proxy", 1)` to account for nginx
- To push the image to Docker Hub repo, you have to name the tag after the repo name.

#### December 28

- **1.5h 12:36:40**:
- Docker giving a missleading error message when the image has been built for the different platform. Solved by building the image for multiple platforms `docker buildx build --platform linux/amd64,linux/arm64 -t milac0/reddit:1 --push .`
- Disabled schema.graphql file creation (emitSchemaFile dev only)
- Fixed env var name to match dokku's name (DATABASE_URL) [link](https://dokku.com/docs/configuration/environment-variables/)
- Added a domain [link](https://dokku.com/docs/configuration/domains/?h=domain)
- Opened a port `dokku ports:add http:80:8080` [link](https://dokku.com/docs/networking/port-management/?h=port)
- Enabled SSL [link](https://github.com/dokku/dokku-letsencrypt)

#### December 29

- **4h THE END**:
- Removed NitroV2Plugin from Tanstack Router that caused build failiure (no SSR)
- A handy how-to for cookie debugging [link](https://github.com/benawad/how-to-debug-cookies/blob/master/README.md)
- Redis inspection: `dokku redis:connect <redis-service-name>` to get inside redis-cli [link](https://github.com/dokku/dokku-redis)
- Postgres inspection (get in psql):
  - `dokku postgres:connect <postgres-service-name>`
  - `docker exec -it <container_id> psql -U postgres`

### Integration Notes

- Integrated Apollo Server with Express using [@as-integrations/express5](https://www.npmjs.com/package/@as-integrations/express5).
- Converted entities into GraphQL types using `@ObjectType()` and `@Field()`.
- Referenced a [TypeGraphQL and MikroORM example](https://github.com/MichalLytek/type-graphql/tree/v2.0.0-rc.2/examples/mikro-orm).
- [Containerize a Node.js app](https://docs.docker.com/guides/nodejs/containerize/)

### Actionables

- [x] Fix `.env` file to resolve `process.env.DB_PASSWORD = undefined`.
- [ ] How to send and handle validation error messages and errors in general
- [ ] Fix shadcn base styles/colors
- [x] Explore search params and dynamic routes (update-password.tsx)
- [ ] Handle database exceptions in ErrorInterceptor
- [ ] isUser.ts breaks app if the user entity is imported from @/...
- [ ] add Zod validation
- [x] fix rerendering whole page when loading more Posts
- [ ] password recovery bug after submitting new password?

### Keyboard shortcuts

- PGUP/PGDN
- CMD + Shift + . => main functions
- Ctrl + Shift + Right Arrow => smart select
