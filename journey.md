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

### Integration Notes

- Integrated Apollo Server with Express using [@as-integrations/express5](https://www.npmjs.com/package/@as-integrations/express5).
- Converted entities into GraphQL types using `@ObjectType()` and `@Field()`.
- Referenced a [TypeGraphQL and MikroORM example](https://github.com/MichalLytek/type-graphql/tree/v2.0.0-rc.2/examples/mikro-orm).

### Actionables

- [ ] Fix `.env` file to resolve `process.env.DB_PASSWORD = undefined`.
- [ ] How to send and handle validation error messages and errors in general
- [ ] Fix shadcn base styles/colors
