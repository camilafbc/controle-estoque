
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Curso
 * 
 */
export type Curso = $Result.DefaultSelection<Prisma.$CursoPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Turma
 * 
 */
export type Turma = $Result.DefaultSelection<Prisma.$TurmaPayload>
/**
 * Model Produto
 * 
 */
export type Produto = $Result.DefaultSelection<Prisma.$ProdutoPayload>
/**
 * Model Operacao
 * 
 */
export type Operacao = $Result.DefaultSelection<Prisma.$OperacaoPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  admin: 'admin',
  user: 'user'
};

export type Role = (typeof Role)[keyof typeof Role]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Cursos
 * const cursos = await prisma.curso.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Cursos
   * const cursos = await prisma.curso.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.curso`: Exposes CRUD operations for the **Curso** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Cursos
    * const cursos = await prisma.curso.findMany()
    * ```
    */
  get curso(): Prisma.CursoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.turma`: Exposes CRUD operations for the **Turma** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Turmas
    * const turmas = await prisma.turma.findMany()
    * ```
    */
  get turma(): Prisma.TurmaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.produto`: Exposes CRUD operations for the **Produto** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Produtos
    * const produtos = await prisma.produto.findMany()
    * ```
    */
  get produto(): Prisma.ProdutoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.operacao`: Exposes CRUD operations for the **Operacao** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Operacaos
    * const operacaos = await prisma.operacao.findMany()
    * ```
    */
  get operacao(): Prisma.OperacaoDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.14.0
   * Query Engine version: 717184b7b35ea05dfa71a3236b7af656013e1e49
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Curso: 'Curso',
    User: 'User',
    Turma: 'Turma',
    Produto: 'Produto',
    Operacao: 'Operacao'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "curso" | "user" | "turma" | "produto" | "operacao"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Curso: {
        payload: Prisma.$CursoPayload<ExtArgs>
        fields: Prisma.CursoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CursoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CursoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CursoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CursoPayload>
          }
          findFirst: {
            args: Prisma.CursoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CursoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CursoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CursoPayload>
          }
          findMany: {
            args: Prisma.CursoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CursoPayload>[]
          }
          create: {
            args: Prisma.CursoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CursoPayload>
          }
          createMany: {
            args: Prisma.CursoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CursoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CursoPayload>[]
          }
          delete: {
            args: Prisma.CursoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CursoPayload>
          }
          update: {
            args: Prisma.CursoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CursoPayload>
          }
          deleteMany: {
            args: Prisma.CursoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CursoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CursoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CursoPayload>[]
          }
          upsert: {
            args: Prisma.CursoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CursoPayload>
          }
          aggregate: {
            args: Prisma.CursoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCurso>
          }
          groupBy: {
            args: Prisma.CursoGroupByArgs<ExtArgs>
            result: $Utils.Optional<CursoGroupByOutputType>[]
          }
          count: {
            args: Prisma.CursoCountArgs<ExtArgs>
            result: $Utils.Optional<CursoCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Turma: {
        payload: Prisma.$TurmaPayload<ExtArgs>
        fields: Prisma.TurmaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TurmaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurmaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TurmaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurmaPayload>
          }
          findFirst: {
            args: Prisma.TurmaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurmaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TurmaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurmaPayload>
          }
          findMany: {
            args: Prisma.TurmaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurmaPayload>[]
          }
          create: {
            args: Prisma.TurmaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurmaPayload>
          }
          createMany: {
            args: Prisma.TurmaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TurmaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurmaPayload>[]
          }
          delete: {
            args: Prisma.TurmaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurmaPayload>
          }
          update: {
            args: Prisma.TurmaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurmaPayload>
          }
          deleteMany: {
            args: Prisma.TurmaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TurmaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TurmaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurmaPayload>[]
          }
          upsert: {
            args: Prisma.TurmaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurmaPayload>
          }
          aggregate: {
            args: Prisma.TurmaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTurma>
          }
          groupBy: {
            args: Prisma.TurmaGroupByArgs<ExtArgs>
            result: $Utils.Optional<TurmaGroupByOutputType>[]
          }
          count: {
            args: Prisma.TurmaCountArgs<ExtArgs>
            result: $Utils.Optional<TurmaCountAggregateOutputType> | number
          }
        }
      }
      Produto: {
        payload: Prisma.$ProdutoPayload<ExtArgs>
        fields: Prisma.ProdutoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProdutoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProdutoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>
          }
          findFirst: {
            args: Prisma.ProdutoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProdutoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>
          }
          findMany: {
            args: Prisma.ProdutoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>[]
          }
          create: {
            args: Prisma.ProdutoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>
          }
          createMany: {
            args: Prisma.ProdutoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProdutoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>[]
          }
          delete: {
            args: Prisma.ProdutoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>
          }
          update: {
            args: Prisma.ProdutoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>
          }
          deleteMany: {
            args: Prisma.ProdutoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProdutoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProdutoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>[]
          }
          upsert: {
            args: Prisma.ProdutoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>
          }
          aggregate: {
            args: Prisma.ProdutoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduto>
          }
          groupBy: {
            args: Prisma.ProdutoGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProdutoGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProdutoCountArgs<ExtArgs>
            result: $Utils.Optional<ProdutoCountAggregateOutputType> | number
          }
        }
      }
      Operacao: {
        payload: Prisma.$OperacaoPayload<ExtArgs>
        fields: Prisma.OperacaoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OperacaoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperacaoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OperacaoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperacaoPayload>
          }
          findFirst: {
            args: Prisma.OperacaoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperacaoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OperacaoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperacaoPayload>
          }
          findMany: {
            args: Prisma.OperacaoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperacaoPayload>[]
          }
          create: {
            args: Prisma.OperacaoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperacaoPayload>
          }
          createMany: {
            args: Prisma.OperacaoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OperacaoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperacaoPayload>[]
          }
          delete: {
            args: Prisma.OperacaoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperacaoPayload>
          }
          update: {
            args: Prisma.OperacaoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperacaoPayload>
          }
          deleteMany: {
            args: Prisma.OperacaoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OperacaoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OperacaoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperacaoPayload>[]
          }
          upsert: {
            args: Prisma.OperacaoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperacaoPayload>
          }
          aggregate: {
            args: Prisma.OperacaoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOperacao>
          }
          groupBy: {
            args: Prisma.OperacaoGroupByArgs<ExtArgs>
            result: $Utils.Optional<OperacaoGroupByOutputType>[]
          }
          count: {
            args: Prisma.OperacaoCountArgs<ExtArgs>
            result: $Utils.Optional<OperacaoCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    curso?: CursoOmit
    user?: UserOmit
    turma?: TurmaOmit
    produto?: ProdutoOmit
    operacao?: OperacaoOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CursoCountOutputType
   */

  export type CursoCountOutputType = {
    turmas: number
    produtos: number
    users: number
  }

  export type CursoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    turmas?: boolean | CursoCountOutputTypeCountTurmasArgs
    produtos?: boolean | CursoCountOutputTypeCountProdutosArgs
    users?: boolean | CursoCountOutputTypeCountUsersArgs
  }

  // Custom InputTypes
  /**
   * CursoCountOutputType without action
   */
  export type CursoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CursoCountOutputType
     */
    select?: CursoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CursoCountOutputType without action
   */
  export type CursoCountOutputTypeCountTurmasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TurmaWhereInput
  }

  /**
   * CursoCountOutputType without action
   */
  export type CursoCountOutputTypeCountProdutosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProdutoWhereInput
  }

  /**
   * CursoCountOutputType without action
   */
  export type CursoCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    operacoes: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    operacoes?: boolean | UserCountOutputTypeCountOperacoesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOperacoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OperacaoWhereInput
  }


  /**
   * Count Type TurmaCountOutputType
   */

  export type TurmaCountOutputType = {
    produtos: number
  }

  export type TurmaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    produtos?: boolean | TurmaCountOutputTypeCountProdutosArgs
  }

  // Custom InputTypes
  /**
   * TurmaCountOutputType without action
   */
  export type TurmaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TurmaCountOutputType
     */
    select?: TurmaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TurmaCountOutputType without action
   */
  export type TurmaCountOutputTypeCountProdutosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProdutoWhereInput
  }


  /**
   * Count Type ProdutoCountOutputType
   */

  export type ProdutoCountOutputType = {
    operacoes: number
  }

  export type ProdutoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    operacoes?: boolean | ProdutoCountOutputTypeCountOperacoesArgs
  }

  // Custom InputTypes
  /**
   * ProdutoCountOutputType without action
   */
  export type ProdutoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProdutoCountOutputType
     */
    select?: ProdutoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProdutoCountOutputType without action
   */
  export type ProdutoCountOutputTypeCountOperacoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OperacaoWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Curso
   */

  export type AggregateCurso = {
    _count: CursoCountAggregateOutputType | null
    _avg: CursoAvgAggregateOutputType | null
    _sum: CursoSumAggregateOutputType | null
    _min: CursoMinAggregateOutputType | null
    _max: CursoMaxAggregateOutputType | null
  }

  export type CursoAvgAggregateOutputType = {
    idCurso: number | null
  }

  export type CursoSumAggregateOutputType = {
    idCurso: number | null
  }

  export type CursoMinAggregateOutputType = {
    idCurso: number | null
    nomeCurso: string | null
    status: boolean | null
  }

  export type CursoMaxAggregateOutputType = {
    idCurso: number | null
    nomeCurso: string | null
    status: boolean | null
  }

  export type CursoCountAggregateOutputType = {
    idCurso: number
    nomeCurso: number
    status: number
    _all: number
  }


  export type CursoAvgAggregateInputType = {
    idCurso?: true
  }

  export type CursoSumAggregateInputType = {
    idCurso?: true
  }

  export type CursoMinAggregateInputType = {
    idCurso?: true
    nomeCurso?: true
    status?: true
  }

  export type CursoMaxAggregateInputType = {
    idCurso?: true
    nomeCurso?: true
    status?: true
  }

  export type CursoCountAggregateInputType = {
    idCurso?: true
    nomeCurso?: true
    status?: true
    _all?: true
  }

  export type CursoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Curso to aggregate.
     */
    where?: CursoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cursos to fetch.
     */
    orderBy?: CursoOrderByWithRelationInput | CursoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CursoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cursos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cursos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Cursos
    **/
    _count?: true | CursoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CursoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CursoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CursoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CursoMaxAggregateInputType
  }

  export type GetCursoAggregateType<T extends CursoAggregateArgs> = {
        [P in keyof T & keyof AggregateCurso]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCurso[P]>
      : GetScalarType<T[P], AggregateCurso[P]>
  }




  export type CursoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CursoWhereInput
    orderBy?: CursoOrderByWithAggregationInput | CursoOrderByWithAggregationInput[]
    by: CursoScalarFieldEnum[] | CursoScalarFieldEnum
    having?: CursoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CursoCountAggregateInputType | true
    _avg?: CursoAvgAggregateInputType
    _sum?: CursoSumAggregateInputType
    _min?: CursoMinAggregateInputType
    _max?: CursoMaxAggregateInputType
  }

  export type CursoGroupByOutputType = {
    idCurso: number
    nomeCurso: string
    status: boolean
    _count: CursoCountAggregateOutputType | null
    _avg: CursoAvgAggregateOutputType | null
    _sum: CursoSumAggregateOutputType | null
    _min: CursoMinAggregateOutputType | null
    _max: CursoMaxAggregateOutputType | null
  }

  type GetCursoGroupByPayload<T extends CursoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CursoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CursoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CursoGroupByOutputType[P]>
            : GetScalarType<T[P], CursoGroupByOutputType[P]>
        }
      >
    >


  export type CursoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idCurso?: boolean
    nomeCurso?: boolean
    status?: boolean
    turmas?: boolean | Curso$turmasArgs<ExtArgs>
    produtos?: boolean | Curso$produtosArgs<ExtArgs>
    users?: boolean | Curso$usersArgs<ExtArgs>
    _count?: boolean | CursoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["curso"]>

  export type CursoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idCurso?: boolean
    nomeCurso?: boolean
    status?: boolean
  }, ExtArgs["result"]["curso"]>

  export type CursoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idCurso?: boolean
    nomeCurso?: boolean
    status?: boolean
  }, ExtArgs["result"]["curso"]>

  export type CursoSelectScalar = {
    idCurso?: boolean
    nomeCurso?: boolean
    status?: boolean
  }

  export type CursoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"idCurso" | "nomeCurso" | "status", ExtArgs["result"]["curso"]>
  export type CursoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    turmas?: boolean | Curso$turmasArgs<ExtArgs>
    produtos?: boolean | Curso$produtosArgs<ExtArgs>
    users?: boolean | Curso$usersArgs<ExtArgs>
    _count?: boolean | CursoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CursoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CursoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CursoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Curso"
    objects: {
      turmas: Prisma.$TurmaPayload<ExtArgs>[]
      produtos: Prisma.$ProdutoPayload<ExtArgs>[]
      users: Prisma.$UserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      idCurso: number
      nomeCurso: string
      status: boolean
    }, ExtArgs["result"]["curso"]>
    composites: {}
  }

  type CursoGetPayload<S extends boolean | null | undefined | CursoDefaultArgs> = $Result.GetResult<Prisma.$CursoPayload, S>

  type CursoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CursoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CursoCountAggregateInputType | true
    }

  export interface CursoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Curso'], meta: { name: 'Curso' } }
    /**
     * Find zero or one Curso that matches the filter.
     * @param {CursoFindUniqueArgs} args - Arguments to find a Curso
     * @example
     * // Get one Curso
     * const curso = await prisma.curso.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CursoFindUniqueArgs>(args: SelectSubset<T, CursoFindUniqueArgs<ExtArgs>>): Prisma__CursoClient<$Result.GetResult<Prisma.$CursoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Curso that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CursoFindUniqueOrThrowArgs} args - Arguments to find a Curso
     * @example
     * // Get one Curso
     * const curso = await prisma.curso.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CursoFindUniqueOrThrowArgs>(args: SelectSubset<T, CursoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CursoClient<$Result.GetResult<Prisma.$CursoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Curso that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CursoFindFirstArgs} args - Arguments to find a Curso
     * @example
     * // Get one Curso
     * const curso = await prisma.curso.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CursoFindFirstArgs>(args?: SelectSubset<T, CursoFindFirstArgs<ExtArgs>>): Prisma__CursoClient<$Result.GetResult<Prisma.$CursoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Curso that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CursoFindFirstOrThrowArgs} args - Arguments to find a Curso
     * @example
     * // Get one Curso
     * const curso = await prisma.curso.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CursoFindFirstOrThrowArgs>(args?: SelectSubset<T, CursoFindFirstOrThrowArgs<ExtArgs>>): Prisma__CursoClient<$Result.GetResult<Prisma.$CursoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Cursos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CursoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Cursos
     * const cursos = await prisma.curso.findMany()
     * 
     * // Get first 10 Cursos
     * const cursos = await prisma.curso.findMany({ take: 10 })
     * 
     * // Only select the `idCurso`
     * const cursoWithIdCursoOnly = await prisma.curso.findMany({ select: { idCurso: true } })
     * 
     */
    findMany<T extends CursoFindManyArgs>(args?: SelectSubset<T, CursoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CursoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Curso.
     * @param {CursoCreateArgs} args - Arguments to create a Curso.
     * @example
     * // Create one Curso
     * const Curso = await prisma.curso.create({
     *   data: {
     *     // ... data to create a Curso
     *   }
     * })
     * 
     */
    create<T extends CursoCreateArgs>(args: SelectSubset<T, CursoCreateArgs<ExtArgs>>): Prisma__CursoClient<$Result.GetResult<Prisma.$CursoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Cursos.
     * @param {CursoCreateManyArgs} args - Arguments to create many Cursos.
     * @example
     * // Create many Cursos
     * const curso = await prisma.curso.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CursoCreateManyArgs>(args?: SelectSubset<T, CursoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Cursos and returns the data saved in the database.
     * @param {CursoCreateManyAndReturnArgs} args - Arguments to create many Cursos.
     * @example
     * // Create many Cursos
     * const curso = await prisma.curso.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Cursos and only return the `idCurso`
     * const cursoWithIdCursoOnly = await prisma.curso.createManyAndReturn({
     *   select: { idCurso: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CursoCreateManyAndReturnArgs>(args?: SelectSubset<T, CursoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CursoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Curso.
     * @param {CursoDeleteArgs} args - Arguments to delete one Curso.
     * @example
     * // Delete one Curso
     * const Curso = await prisma.curso.delete({
     *   where: {
     *     // ... filter to delete one Curso
     *   }
     * })
     * 
     */
    delete<T extends CursoDeleteArgs>(args: SelectSubset<T, CursoDeleteArgs<ExtArgs>>): Prisma__CursoClient<$Result.GetResult<Prisma.$CursoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Curso.
     * @param {CursoUpdateArgs} args - Arguments to update one Curso.
     * @example
     * // Update one Curso
     * const curso = await prisma.curso.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CursoUpdateArgs>(args: SelectSubset<T, CursoUpdateArgs<ExtArgs>>): Prisma__CursoClient<$Result.GetResult<Prisma.$CursoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Cursos.
     * @param {CursoDeleteManyArgs} args - Arguments to filter Cursos to delete.
     * @example
     * // Delete a few Cursos
     * const { count } = await prisma.curso.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CursoDeleteManyArgs>(args?: SelectSubset<T, CursoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cursos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CursoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Cursos
     * const curso = await prisma.curso.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CursoUpdateManyArgs>(args: SelectSubset<T, CursoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cursos and returns the data updated in the database.
     * @param {CursoUpdateManyAndReturnArgs} args - Arguments to update many Cursos.
     * @example
     * // Update many Cursos
     * const curso = await prisma.curso.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Cursos and only return the `idCurso`
     * const cursoWithIdCursoOnly = await prisma.curso.updateManyAndReturn({
     *   select: { idCurso: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CursoUpdateManyAndReturnArgs>(args: SelectSubset<T, CursoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CursoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Curso.
     * @param {CursoUpsertArgs} args - Arguments to update or create a Curso.
     * @example
     * // Update or create a Curso
     * const curso = await prisma.curso.upsert({
     *   create: {
     *     // ... data to create a Curso
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Curso we want to update
     *   }
     * })
     */
    upsert<T extends CursoUpsertArgs>(args: SelectSubset<T, CursoUpsertArgs<ExtArgs>>): Prisma__CursoClient<$Result.GetResult<Prisma.$CursoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Cursos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CursoCountArgs} args - Arguments to filter Cursos to count.
     * @example
     * // Count the number of Cursos
     * const count = await prisma.curso.count({
     *   where: {
     *     // ... the filter for the Cursos we want to count
     *   }
     * })
    **/
    count<T extends CursoCountArgs>(
      args?: Subset<T, CursoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CursoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Curso.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CursoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CursoAggregateArgs>(args: Subset<T, CursoAggregateArgs>): Prisma.PrismaPromise<GetCursoAggregateType<T>>

    /**
     * Group by Curso.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CursoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CursoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CursoGroupByArgs['orderBy'] }
        : { orderBy?: CursoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CursoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCursoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Curso model
   */
  readonly fields: CursoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Curso.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CursoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    turmas<T extends Curso$turmasArgs<ExtArgs> = {}>(args?: Subset<T, Curso$turmasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TurmaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    produtos<T extends Curso$produtosArgs<ExtArgs> = {}>(args?: Subset<T, Curso$produtosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    users<T extends Curso$usersArgs<ExtArgs> = {}>(args?: Subset<T, Curso$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Curso model
   */
  interface CursoFieldRefs {
    readonly idCurso: FieldRef<"Curso", 'Int'>
    readonly nomeCurso: FieldRef<"Curso", 'String'>
    readonly status: FieldRef<"Curso", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Curso findUnique
   */
  export type CursoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curso
     */
    select?: CursoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Curso
     */
    omit?: CursoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CursoInclude<ExtArgs> | null
    /**
     * Filter, which Curso to fetch.
     */
    where: CursoWhereUniqueInput
  }

  /**
   * Curso findUniqueOrThrow
   */
  export type CursoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curso
     */
    select?: CursoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Curso
     */
    omit?: CursoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CursoInclude<ExtArgs> | null
    /**
     * Filter, which Curso to fetch.
     */
    where: CursoWhereUniqueInput
  }

  /**
   * Curso findFirst
   */
  export type CursoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curso
     */
    select?: CursoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Curso
     */
    omit?: CursoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CursoInclude<ExtArgs> | null
    /**
     * Filter, which Curso to fetch.
     */
    where?: CursoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cursos to fetch.
     */
    orderBy?: CursoOrderByWithRelationInput | CursoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cursos.
     */
    cursor?: CursoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cursos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cursos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cursos.
     */
    distinct?: CursoScalarFieldEnum | CursoScalarFieldEnum[]
  }

  /**
   * Curso findFirstOrThrow
   */
  export type CursoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curso
     */
    select?: CursoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Curso
     */
    omit?: CursoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CursoInclude<ExtArgs> | null
    /**
     * Filter, which Curso to fetch.
     */
    where?: CursoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cursos to fetch.
     */
    orderBy?: CursoOrderByWithRelationInput | CursoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cursos.
     */
    cursor?: CursoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cursos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cursos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cursos.
     */
    distinct?: CursoScalarFieldEnum | CursoScalarFieldEnum[]
  }

  /**
   * Curso findMany
   */
  export type CursoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curso
     */
    select?: CursoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Curso
     */
    omit?: CursoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CursoInclude<ExtArgs> | null
    /**
     * Filter, which Cursos to fetch.
     */
    where?: CursoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cursos to fetch.
     */
    orderBy?: CursoOrderByWithRelationInput | CursoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Cursos.
     */
    cursor?: CursoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cursos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cursos.
     */
    skip?: number
    distinct?: CursoScalarFieldEnum | CursoScalarFieldEnum[]
  }

  /**
   * Curso create
   */
  export type CursoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curso
     */
    select?: CursoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Curso
     */
    omit?: CursoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CursoInclude<ExtArgs> | null
    /**
     * The data needed to create a Curso.
     */
    data: XOR<CursoCreateInput, CursoUncheckedCreateInput>
  }

  /**
   * Curso createMany
   */
  export type CursoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Cursos.
     */
    data: CursoCreateManyInput | CursoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Curso createManyAndReturn
   */
  export type CursoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curso
     */
    select?: CursoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Curso
     */
    omit?: CursoOmit<ExtArgs> | null
    /**
     * The data used to create many Cursos.
     */
    data: CursoCreateManyInput | CursoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Curso update
   */
  export type CursoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curso
     */
    select?: CursoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Curso
     */
    omit?: CursoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CursoInclude<ExtArgs> | null
    /**
     * The data needed to update a Curso.
     */
    data: XOR<CursoUpdateInput, CursoUncheckedUpdateInput>
    /**
     * Choose, which Curso to update.
     */
    where: CursoWhereUniqueInput
  }

  /**
   * Curso updateMany
   */
  export type CursoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Cursos.
     */
    data: XOR<CursoUpdateManyMutationInput, CursoUncheckedUpdateManyInput>
    /**
     * Filter which Cursos to update
     */
    where?: CursoWhereInput
    /**
     * Limit how many Cursos to update.
     */
    limit?: number
  }

  /**
   * Curso updateManyAndReturn
   */
  export type CursoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curso
     */
    select?: CursoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Curso
     */
    omit?: CursoOmit<ExtArgs> | null
    /**
     * The data used to update Cursos.
     */
    data: XOR<CursoUpdateManyMutationInput, CursoUncheckedUpdateManyInput>
    /**
     * Filter which Cursos to update
     */
    where?: CursoWhereInput
    /**
     * Limit how many Cursos to update.
     */
    limit?: number
  }

  /**
   * Curso upsert
   */
  export type CursoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curso
     */
    select?: CursoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Curso
     */
    omit?: CursoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CursoInclude<ExtArgs> | null
    /**
     * The filter to search for the Curso to update in case it exists.
     */
    where: CursoWhereUniqueInput
    /**
     * In case the Curso found by the `where` argument doesn't exist, create a new Curso with this data.
     */
    create: XOR<CursoCreateInput, CursoUncheckedCreateInput>
    /**
     * In case the Curso was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CursoUpdateInput, CursoUncheckedUpdateInput>
  }

  /**
   * Curso delete
   */
  export type CursoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curso
     */
    select?: CursoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Curso
     */
    omit?: CursoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CursoInclude<ExtArgs> | null
    /**
     * Filter which Curso to delete.
     */
    where: CursoWhereUniqueInput
  }

  /**
   * Curso deleteMany
   */
  export type CursoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cursos to delete
     */
    where?: CursoWhereInput
    /**
     * Limit how many Cursos to delete.
     */
    limit?: number
  }

  /**
   * Curso.turmas
   */
  export type Curso$turmasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turma
     */
    select?: TurmaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Turma
     */
    omit?: TurmaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurmaInclude<ExtArgs> | null
    where?: TurmaWhereInput
    orderBy?: TurmaOrderByWithRelationInput | TurmaOrderByWithRelationInput[]
    cursor?: TurmaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TurmaScalarFieldEnum | TurmaScalarFieldEnum[]
  }

  /**
   * Curso.produtos
   */
  export type Curso$produtosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    where?: ProdutoWhereInput
    orderBy?: ProdutoOrderByWithRelationInput | ProdutoOrderByWithRelationInput[]
    cursor?: ProdutoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProdutoScalarFieldEnum | ProdutoScalarFieldEnum[]
  }

  /**
   * Curso.users
   */
  export type Curso$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Curso without action
   */
  export type CursoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curso
     */
    select?: CursoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Curso
     */
    omit?: CursoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CursoInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    idUser: number | null
    idCurso: number | null
    created_by: number | null
  }

  export type UserSumAggregateOutputType = {
    idUser: number | null
    idCurso: number | null
    created_by: number | null
  }

  export type UserMinAggregateOutputType = {
    idUser: number | null
    nome: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
    idCurso: number | null
    status: boolean | null
    created_by: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UserMaxAggregateOutputType = {
    idUser: number | null
    nome: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
    idCurso: number | null
    status: boolean | null
    created_by: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UserCountAggregateOutputType = {
    idUser: number
    nome: number
    email: number
    password: number
    role: number
    idCurso: number
    status: number
    created_by: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    idUser?: true
    idCurso?: true
    created_by?: true
  }

  export type UserSumAggregateInputType = {
    idUser?: true
    idCurso?: true
    created_by?: true
  }

  export type UserMinAggregateInputType = {
    idUser?: true
    nome?: true
    email?: true
    password?: true
    role?: true
    idCurso?: true
    status?: true
    created_by?: true
    created_at?: true
    updated_at?: true
  }

  export type UserMaxAggregateInputType = {
    idUser?: true
    nome?: true
    email?: true
    password?: true
    role?: true
    idCurso?: true
    status?: true
    created_by?: true
    created_at?: true
    updated_at?: true
  }

  export type UserCountAggregateInputType = {
    idUser?: true
    nome?: true
    email?: true
    password?: true
    role?: true
    idCurso?: true
    status?: true
    created_by?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    idUser: number
    nome: string
    email: string
    password: string
    role: $Enums.Role
    idCurso: number | null
    status: boolean
    created_by: number
    created_at: Date
    updated_at: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idUser?: boolean
    nome?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    idCurso?: boolean
    status?: boolean
    created_by?: boolean
    created_at?: boolean
    updated_at?: boolean
    curso?: boolean | User$cursoArgs<ExtArgs>
    operacoes?: boolean | User$operacoesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idUser?: boolean
    nome?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    idCurso?: boolean
    status?: boolean
    created_by?: boolean
    created_at?: boolean
    updated_at?: boolean
    curso?: boolean | User$cursoArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idUser?: boolean
    nome?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    idCurso?: boolean
    status?: boolean
    created_by?: boolean
    created_at?: boolean
    updated_at?: boolean
    curso?: boolean | User$cursoArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    idUser?: boolean
    nome?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    idCurso?: boolean
    status?: boolean
    created_by?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"idUser" | "nome" | "email" | "password" | "role" | "idCurso" | "status" | "created_by" | "created_at" | "updated_at", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    curso?: boolean | User$cursoArgs<ExtArgs>
    operacoes?: boolean | User$operacoesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    curso?: boolean | User$cursoArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    curso?: boolean | User$cursoArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      curso: Prisma.$CursoPayload<ExtArgs> | null
      operacoes: Prisma.$OperacaoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      idUser: number
      nome: string
      email: string
      password: string
      role: $Enums.Role
      idCurso: number | null
      status: boolean
      created_by: number
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `idUser`
     * const userWithIdUserOnly = await prisma.user.findMany({ select: { idUser: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `idUser`
     * const userWithIdUserOnly = await prisma.user.createManyAndReturn({
     *   select: { idUser: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `idUser`
     * const userWithIdUserOnly = await prisma.user.updateManyAndReturn({
     *   select: { idUser: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    curso<T extends User$cursoArgs<ExtArgs> = {}>(args?: Subset<T, User$cursoArgs<ExtArgs>>): Prisma__CursoClient<$Result.GetResult<Prisma.$CursoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    operacoes<T extends User$operacoesArgs<ExtArgs> = {}>(args?: Subset<T, User$operacoesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OperacaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly idUser: FieldRef<"User", 'Int'>
    readonly nome: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly idCurso: FieldRef<"User", 'Int'>
    readonly status: FieldRef<"User", 'Boolean'>
    readonly created_by: FieldRef<"User", 'Int'>
    readonly created_at: FieldRef<"User", 'DateTime'>
    readonly updated_at: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.curso
   */
  export type User$cursoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curso
     */
    select?: CursoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Curso
     */
    omit?: CursoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CursoInclude<ExtArgs> | null
    where?: CursoWhereInput
  }

  /**
   * User.operacoes
   */
  export type User$operacoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operacao
     */
    select?: OperacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operacao
     */
    omit?: OperacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperacaoInclude<ExtArgs> | null
    where?: OperacaoWhereInput
    orderBy?: OperacaoOrderByWithRelationInput | OperacaoOrderByWithRelationInput[]
    cursor?: OperacaoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OperacaoScalarFieldEnum | OperacaoScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Turma
   */

  export type AggregateTurma = {
    _count: TurmaCountAggregateOutputType | null
    _avg: TurmaAvgAggregateOutputType | null
    _sum: TurmaSumAggregateOutputType | null
    _min: TurmaMinAggregateOutputType | null
    _max: TurmaMaxAggregateOutputType | null
  }

  export type TurmaAvgAggregateOutputType = {
    idTurma: number | null
    idCurso: number | null
  }

  export type TurmaSumAggregateOutputType = {
    idTurma: number | null
    idCurso: number | null
  }

  export type TurmaMinAggregateOutputType = {
    idTurma: number | null
    uuid: string | null
    codigoTurma: string | null
    turnoTurma: string | null
    idCurso: number | null
    status: boolean | null
  }

  export type TurmaMaxAggregateOutputType = {
    idTurma: number | null
    uuid: string | null
    codigoTurma: string | null
    turnoTurma: string | null
    idCurso: number | null
    status: boolean | null
  }

  export type TurmaCountAggregateOutputType = {
    idTurma: number
    uuid: number
    codigoTurma: number
    turnoTurma: number
    idCurso: number
    status: number
    _all: number
  }


  export type TurmaAvgAggregateInputType = {
    idTurma?: true
    idCurso?: true
  }

  export type TurmaSumAggregateInputType = {
    idTurma?: true
    idCurso?: true
  }

  export type TurmaMinAggregateInputType = {
    idTurma?: true
    uuid?: true
    codigoTurma?: true
    turnoTurma?: true
    idCurso?: true
    status?: true
  }

  export type TurmaMaxAggregateInputType = {
    idTurma?: true
    uuid?: true
    codigoTurma?: true
    turnoTurma?: true
    idCurso?: true
    status?: true
  }

  export type TurmaCountAggregateInputType = {
    idTurma?: true
    uuid?: true
    codigoTurma?: true
    turnoTurma?: true
    idCurso?: true
    status?: true
    _all?: true
  }

  export type TurmaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Turma to aggregate.
     */
    where?: TurmaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Turmas to fetch.
     */
    orderBy?: TurmaOrderByWithRelationInput | TurmaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TurmaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Turmas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Turmas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Turmas
    **/
    _count?: true | TurmaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TurmaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TurmaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TurmaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TurmaMaxAggregateInputType
  }

  export type GetTurmaAggregateType<T extends TurmaAggregateArgs> = {
        [P in keyof T & keyof AggregateTurma]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTurma[P]>
      : GetScalarType<T[P], AggregateTurma[P]>
  }




  export type TurmaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TurmaWhereInput
    orderBy?: TurmaOrderByWithAggregationInput | TurmaOrderByWithAggregationInput[]
    by: TurmaScalarFieldEnum[] | TurmaScalarFieldEnum
    having?: TurmaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TurmaCountAggregateInputType | true
    _avg?: TurmaAvgAggregateInputType
    _sum?: TurmaSumAggregateInputType
    _min?: TurmaMinAggregateInputType
    _max?: TurmaMaxAggregateInputType
  }

  export type TurmaGroupByOutputType = {
    idTurma: number
    uuid: string
    codigoTurma: string
    turnoTurma: string
    idCurso: number
    status: boolean
    _count: TurmaCountAggregateOutputType | null
    _avg: TurmaAvgAggregateOutputType | null
    _sum: TurmaSumAggregateOutputType | null
    _min: TurmaMinAggregateOutputType | null
    _max: TurmaMaxAggregateOutputType | null
  }

  type GetTurmaGroupByPayload<T extends TurmaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TurmaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TurmaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TurmaGroupByOutputType[P]>
            : GetScalarType<T[P], TurmaGroupByOutputType[P]>
        }
      >
    >


  export type TurmaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idTurma?: boolean
    uuid?: boolean
    codigoTurma?: boolean
    turnoTurma?: boolean
    idCurso?: boolean
    status?: boolean
    curso?: boolean | CursoDefaultArgs<ExtArgs>
    produtos?: boolean | Turma$produtosArgs<ExtArgs>
    _count?: boolean | TurmaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["turma"]>

  export type TurmaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idTurma?: boolean
    uuid?: boolean
    codigoTurma?: boolean
    turnoTurma?: boolean
    idCurso?: boolean
    status?: boolean
    curso?: boolean | CursoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["turma"]>

  export type TurmaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idTurma?: boolean
    uuid?: boolean
    codigoTurma?: boolean
    turnoTurma?: boolean
    idCurso?: boolean
    status?: boolean
    curso?: boolean | CursoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["turma"]>

  export type TurmaSelectScalar = {
    idTurma?: boolean
    uuid?: boolean
    codigoTurma?: boolean
    turnoTurma?: boolean
    idCurso?: boolean
    status?: boolean
  }

  export type TurmaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"idTurma" | "uuid" | "codigoTurma" | "turnoTurma" | "idCurso" | "status", ExtArgs["result"]["turma"]>
  export type TurmaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    curso?: boolean | CursoDefaultArgs<ExtArgs>
    produtos?: boolean | Turma$produtosArgs<ExtArgs>
    _count?: boolean | TurmaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TurmaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    curso?: boolean | CursoDefaultArgs<ExtArgs>
  }
  export type TurmaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    curso?: boolean | CursoDefaultArgs<ExtArgs>
  }

  export type $TurmaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Turma"
    objects: {
      curso: Prisma.$CursoPayload<ExtArgs>
      produtos: Prisma.$ProdutoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      idTurma: number
      uuid: string
      codigoTurma: string
      turnoTurma: string
      idCurso: number
      status: boolean
    }, ExtArgs["result"]["turma"]>
    composites: {}
  }

  type TurmaGetPayload<S extends boolean | null | undefined | TurmaDefaultArgs> = $Result.GetResult<Prisma.$TurmaPayload, S>

  type TurmaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TurmaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TurmaCountAggregateInputType | true
    }

  export interface TurmaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Turma'], meta: { name: 'Turma' } }
    /**
     * Find zero or one Turma that matches the filter.
     * @param {TurmaFindUniqueArgs} args - Arguments to find a Turma
     * @example
     * // Get one Turma
     * const turma = await prisma.turma.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TurmaFindUniqueArgs>(args: SelectSubset<T, TurmaFindUniqueArgs<ExtArgs>>): Prisma__TurmaClient<$Result.GetResult<Prisma.$TurmaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Turma that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TurmaFindUniqueOrThrowArgs} args - Arguments to find a Turma
     * @example
     * // Get one Turma
     * const turma = await prisma.turma.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TurmaFindUniqueOrThrowArgs>(args: SelectSubset<T, TurmaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TurmaClient<$Result.GetResult<Prisma.$TurmaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Turma that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TurmaFindFirstArgs} args - Arguments to find a Turma
     * @example
     * // Get one Turma
     * const turma = await prisma.turma.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TurmaFindFirstArgs>(args?: SelectSubset<T, TurmaFindFirstArgs<ExtArgs>>): Prisma__TurmaClient<$Result.GetResult<Prisma.$TurmaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Turma that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TurmaFindFirstOrThrowArgs} args - Arguments to find a Turma
     * @example
     * // Get one Turma
     * const turma = await prisma.turma.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TurmaFindFirstOrThrowArgs>(args?: SelectSubset<T, TurmaFindFirstOrThrowArgs<ExtArgs>>): Prisma__TurmaClient<$Result.GetResult<Prisma.$TurmaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Turmas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TurmaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Turmas
     * const turmas = await prisma.turma.findMany()
     * 
     * // Get first 10 Turmas
     * const turmas = await prisma.turma.findMany({ take: 10 })
     * 
     * // Only select the `idTurma`
     * const turmaWithIdTurmaOnly = await prisma.turma.findMany({ select: { idTurma: true } })
     * 
     */
    findMany<T extends TurmaFindManyArgs>(args?: SelectSubset<T, TurmaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TurmaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Turma.
     * @param {TurmaCreateArgs} args - Arguments to create a Turma.
     * @example
     * // Create one Turma
     * const Turma = await prisma.turma.create({
     *   data: {
     *     // ... data to create a Turma
     *   }
     * })
     * 
     */
    create<T extends TurmaCreateArgs>(args: SelectSubset<T, TurmaCreateArgs<ExtArgs>>): Prisma__TurmaClient<$Result.GetResult<Prisma.$TurmaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Turmas.
     * @param {TurmaCreateManyArgs} args - Arguments to create many Turmas.
     * @example
     * // Create many Turmas
     * const turma = await prisma.turma.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TurmaCreateManyArgs>(args?: SelectSubset<T, TurmaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Turmas and returns the data saved in the database.
     * @param {TurmaCreateManyAndReturnArgs} args - Arguments to create many Turmas.
     * @example
     * // Create many Turmas
     * const turma = await prisma.turma.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Turmas and only return the `idTurma`
     * const turmaWithIdTurmaOnly = await prisma.turma.createManyAndReturn({
     *   select: { idTurma: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TurmaCreateManyAndReturnArgs>(args?: SelectSubset<T, TurmaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TurmaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Turma.
     * @param {TurmaDeleteArgs} args - Arguments to delete one Turma.
     * @example
     * // Delete one Turma
     * const Turma = await prisma.turma.delete({
     *   where: {
     *     // ... filter to delete one Turma
     *   }
     * })
     * 
     */
    delete<T extends TurmaDeleteArgs>(args: SelectSubset<T, TurmaDeleteArgs<ExtArgs>>): Prisma__TurmaClient<$Result.GetResult<Prisma.$TurmaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Turma.
     * @param {TurmaUpdateArgs} args - Arguments to update one Turma.
     * @example
     * // Update one Turma
     * const turma = await prisma.turma.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TurmaUpdateArgs>(args: SelectSubset<T, TurmaUpdateArgs<ExtArgs>>): Prisma__TurmaClient<$Result.GetResult<Prisma.$TurmaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Turmas.
     * @param {TurmaDeleteManyArgs} args - Arguments to filter Turmas to delete.
     * @example
     * // Delete a few Turmas
     * const { count } = await prisma.turma.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TurmaDeleteManyArgs>(args?: SelectSubset<T, TurmaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Turmas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TurmaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Turmas
     * const turma = await prisma.turma.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TurmaUpdateManyArgs>(args: SelectSubset<T, TurmaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Turmas and returns the data updated in the database.
     * @param {TurmaUpdateManyAndReturnArgs} args - Arguments to update many Turmas.
     * @example
     * // Update many Turmas
     * const turma = await prisma.turma.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Turmas and only return the `idTurma`
     * const turmaWithIdTurmaOnly = await prisma.turma.updateManyAndReturn({
     *   select: { idTurma: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TurmaUpdateManyAndReturnArgs>(args: SelectSubset<T, TurmaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TurmaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Turma.
     * @param {TurmaUpsertArgs} args - Arguments to update or create a Turma.
     * @example
     * // Update or create a Turma
     * const turma = await prisma.turma.upsert({
     *   create: {
     *     // ... data to create a Turma
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Turma we want to update
     *   }
     * })
     */
    upsert<T extends TurmaUpsertArgs>(args: SelectSubset<T, TurmaUpsertArgs<ExtArgs>>): Prisma__TurmaClient<$Result.GetResult<Prisma.$TurmaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Turmas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TurmaCountArgs} args - Arguments to filter Turmas to count.
     * @example
     * // Count the number of Turmas
     * const count = await prisma.turma.count({
     *   where: {
     *     // ... the filter for the Turmas we want to count
     *   }
     * })
    **/
    count<T extends TurmaCountArgs>(
      args?: Subset<T, TurmaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TurmaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Turma.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TurmaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TurmaAggregateArgs>(args: Subset<T, TurmaAggregateArgs>): Prisma.PrismaPromise<GetTurmaAggregateType<T>>

    /**
     * Group by Turma.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TurmaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TurmaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TurmaGroupByArgs['orderBy'] }
        : { orderBy?: TurmaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TurmaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTurmaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Turma model
   */
  readonly fields: TurmaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Turma.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TurmaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    curso<T extends CursoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CursoDefaultArgs<ExtArgs>>): Prisma__CursoClient<$Result.GetResult<Prisma.$CursoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    produtos<T extends Turma$produtosArgs<ExtArgs> = {}>(args?: Subset<T, Turma$produtosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Turma model
   */
  interface TurmaFieldRefs {
    readonly idTurma: FieldRef<"Turma", 'Int'>
    readonly uuid: FieldRef<"Turma", 'String'>
    readonly codigoTurma: FieldRef<"Turma", 'String'>
    readonly turnoTurma: FieldRef<"Turma", 'String'>
    readonly idCurso: FieldRef<"Turma", 'Int'>
    readonly status: FieldRef<"Turma", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Turma findUnique
   */
  export type TurmaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turma
     */
    select?: TurmaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Turma
     */
    omit?: TurmaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurmaInclude<ExtArgs> | null
    /**
     * Filter, which Turma to fetch.
     */
    where: TurmaWhereUniqueInput
  }

  /**
   * Turma findUniqueOrThrow
   */
  export type TurmaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turma
     */
    select?: TurmaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Turma
     */
    omit?: TurmaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurmaInclude<ExtArgs> | null
    /**
     * Filter, which Turma to fetch.
     */
    where: TurmaWhereUniqueInput
  }

  /**
   * Turma findFirst
   */
  export type TurmaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turma
     */
    select?: TurmaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Turma
     */
    omit?: TurmaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurmaInclude<ExtArgs> | null
    /**
     * Filter, which Turma to fetch.
     */
    where?: TurmaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Turmas to fetch.
     */
    orderBy?: TurmaOrderByWithRelationInput | TurmaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Turmas.
     */
    cursor?: TurmaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Turmas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Turmas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Turmas.
     */
    distinct?: TurmaScalarFieldEnum | TurmaScalarFieldEnum[]
  }

  /**
   * Turma findFirstOrThrow
   */
  export type TurmaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turma
     */
    select?: TurmaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Turma
     */
    omit?: TurmaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurmaInclude<ExtArgs> | null
    /**
     * Filter, which Turma to fetch.
     */
    where?: TurmaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Turmas to fetch.
     */
    orderBy?: TurmaOrderByWithRelationInput | TurmaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Turmas.
     */
    cursor?: TurmaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Turmas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Turmas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Turmas.
     */
    distinct?: TurmaScalarFieldEnum | TurmaScalarFieldEnum[]
  }

  /**
   * Turma findMany
   */
  export type TurmaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turma
     */
    select?: TurmaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Turma
     */
    omit?: TurmaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurmaInclude<ExtArgs> | null
    /**
     * Filter, which Turmas to fetch.
     */
    where?: TurmaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Turmas to fetch.
     */
    orderBy?: TurmaOrderByWithRelationInput | TurmaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Turmas.
     */
    cursor?: TurmaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Turmas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Turmas.
     */
    skip?: number
    distinct?: TurmaScalarFieldEnum | TurmaScalarFieldEnum[]
  }

  /**
   * Turma create
   */
  export type TurmaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turma
     */
    select?: TurmaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Turma
     */
    omit?: TurmaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurmaInclude<ExtArgs> | null
    /**
     * The data needed to create a Turma.
     */
    data: XOR<TurmaCreateInput, TurmaUncheckedCreateInput>
  }

  /**
   * Turma createMany
   */
  export type TurmaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Turmas.
     */
    data: TurmaCreateManyInput | TurmaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Turma createManyAndReturn
   */
  export type TurmaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turma
     */
    select?: TurmaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Turma
     */
    omit?: TurmaOmit<ExtArgs> | null
    /**
     * The data used to create many Turmas.
     */
    data: TurmaCreateManyInput | TurmaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurmaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Turma update
   */
  export type TurmaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turma
     */
    select?: TurmaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Turma
     */
    omit?: TurmaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurmaInclude<ExtArgs> | null
    /**
     * The data needed to update a Turma.
     */
    data: XOR<TurmaUpdateInput, TurmaUncheckedUpdateInput>
    /**
     * Choose, which Turma to update.
     */
    where: TurmaWhereUniqueInput
  }

  /**
   * Turma updateMany
   */
  export type TurmaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Turmas.
     */
    data: XOR<TurmaUpdateManyMutationInput, TurmaUncheckedUpdateManyInput>
    /**
     * Filter which Turmas to update
     */
    where?: TurmaWhereInput
    /**
     * Limit how many Turmas to update.
     */
    limit?: number
  }

  /**
   * Turma updateManyAndReturn
   */
  export type TurmaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turma
     */
    select?: TurmaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Turma
     */
    omit?: TurmaOmit<ExtArgs> | null
    /**
     * The data used to update Turmas.
     */
    data: XOR<TurmaUpdateManyMutationInput, TurmaUncheckedUpdateManyInput>
    /**
     * Filter which Turmas to update
     */
    where?: TurmaWhereInput
    /**
     * Limit how many Turmas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurmaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Turma upsert
   */
  export type TurmaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turma
     */
    select?: TurmaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Turma
     */
    omit?: TurmaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurmaInclude<ExtArgs> | null
    /**
     * The filter to search for the Turma to update in case it exists.
     */
    where: TurmaWhereUniqueInput
    /**
     * In case the Turma found by the `where` argument doesn't exist, create a new Turma with this data.
     */
    create: XOR<TurmaCreateInput, TurmaUncheckedCreateInput>
    /**
     * In case the Turma was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TurmaUpdateInput, TurmaUncheckedUpdateInput>
  }

  /**
   * Turma delete
   */
  export type TurmaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turma
     */
    select?: TurmaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Turma
     */
    omit?: TurmaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurmaInclude<ExtArgs> | null
    /**
     * Filter which Turma to delete.
     */
    where: TurmaWhereUniqueInput
  }

  /**
   * Turma deleteMany
   */
  export type TurmaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Turmas to delete
     */
    where?: TurmaWhereInput
    /**
     * Limit how many Turmas to delete.
     */
    limit?: number
  }

  /**
   * Turma.produtos
   */
  export type Turma$produtosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    where?: ProdutoWhereInput
    orderBy?: ProdutoOrderByWithRelationInput | ProdutoOrderByWithRelationInput[]
    cursor?: ProdutoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProdutoScalarFieldEnum | ProdutoScalarFieldEnum[]
  }

  /**
   * Turma without action
   */
  export type TurmaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turma
     */
    select?: TurmaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Turma
     */
    omit?: TurmaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurmaInclude<ExtArgs> | null
  }


  /**
   * Model Produto
   */

  export type AggregateProduto = {
    _count: ProdutoCountAggregateOutputType | null
    _avg: ProdutoAvgAggregateOutputType | null
    _sum: ProdutoSumAggregateOutputType | null
    _min: ProdutoMinAggregateOutputType | null
    _max: ProdutoMaxAggregateOutputType | null
  }

  export type ProdutoAvgAggregateOutputType = {
    idProduto: number | null
    prodQuantidade: number | null
    prodCurso: number | null
    prodTurma: number | null
  }

  export type ProdutoSumAggregateOutputType = {
    idProduto: number | null
    prodQuantidade: number | null
    prodCurso: number | null
    prodTurma: number | null
  }

  export type ProdutoMinAggregateOutputType = {
    idProduto: number | null
    uuid: string | null
    prodDescricao: string | null
    prodFabricante: string | null
    prodQuantidade: number | null
    prodValidade: Date | null
    prodLote: string | null
    prodCurso: number | null
    prodTurma: number | null
  }

  export type ProdutoMaxAggregateOutputType = {
    idProduto: number | null
    uuid: string | null
    prodDescricao: string | null
    prodFabricante: string | null
    prodQuantidade: number | null
    prodValidade: Date | null
    prodLote: string | null
    prodCurso: number | null
    prodTurma: number | null
  }

  export type ProdutoCountAggregateOutputType = {
    idProduto: number
    uuid: number
    prodDescricao: number
    prodFabricante: number
    prodQuantidade: number
    prodValidade: number
    prodLote: number
    prodCurso: number
    prodTurma: number
    _all: number
  }


  export type ProdutoAvgAggregateInputType = {
    idProduto?: true
    prodQuantidade?: true
    prodCurso?: true
    prodTurma?: true
  }

  export type ProdutoSumAggregateInputType = {
    idProduto?: true
    prodQuantidade?: true
    prodCurso?: true
    prodTurma?: true
  }

  export type ProdutoMinAggregateInputType = {
    idProduto?: true
    uuid?: true
    prodDescricao?: true
    prodFabricante?: true
    prodQuantidade?: true
    prodValidade?: true
    prodLote?: true
    prodCurso?: true
    prodTurma?: true
  }

  export type ProdutoMaxAggregateInputType = {
    idProduto?: true
    uuid?: true
    prodDescricao?: true
    prodFabricante?: true
    prodQuantidade?: true
    prodValidade?: true
    prodLote?: true
    prodCurso?: true
    prodTurma?: true
  }

  export type ProdutoCountAggregateInputType = {
    idProduto?: true
    uuid?: true
    prodDescricao?: true
    prodFabricante?: true
    prodQuantidade?: true
    prodValidade?: true
    prodLote?: true
    prodCurso?: true
    prodTurma?: true
    _all?: true
  }

  export type ProdutoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Produto to aggregate.
     */
    where?: ProdutoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Produtos to fetch.
     */
    orderBy?: ProdutoOrderByWithRelationInput | ProdutoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProdutoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Produtos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Produtos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Produtos
    **/
    _count?: true | ProdutoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProdutoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProdutoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProdutoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProdutoMaxAggregateInputType
  }

  export type GetProdutoAggregateType<T extends ProdutoAggregateArgs> = {
        [P in keyof T & keyof AggregateProduto]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduto[P]>
      : GetScalarType<T[P], AggregateProduto[P]>
  }




  export type ProdutoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProdutoWhereInput
    orderBy?: ProdutoOrderByWithAggregationInput | ProdutoOrderByWithAggregationInput[]
    by: ProdutoScalarFieldEnum[] | ProdutoScalarFieldEnum
    having?: ProdutoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProdutoCountAggregateInputType | true
    _avg?: ProdutoAvgAggregateInputType
    _sum?: ProdutoSumAggregateInputType
    _min?: ProdutoMinAggregateInputType
    _max?: ProdutoMaxAggregateInputType
  }

  export type ProdutoGroupByOutputType = {
    idProduto: number
    uuid: string
    prodDescricao: string
    prodFabricante: string
    prodQuantidade: number
    prodValidade: Date
    prodLote: string
    prodCurso: number
    prodTurma: number
    _count: ProdutoCountAggregateOutputType | null
    _avg: ProdutoAvgAggregateOutputType | null
    _sum: ProdutoSumAggregateOutputType | null
    _min: ProdutoMinAggregateOutputType | null
    _max: ProdutoMaxAggregateOutputType | null
  }

  type GetProdutoGroupByPayload<T extends ProdutoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProdutoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProdutoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProdutoGroupByOutputType[P]>
            : GetScalarType<T[P], ProdutoGroupByOutputType[P]>
        }
      >
    >


  export type ProdutoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idProduto?: boolean
    uuid?: boolean
    prodDescricao?: boolean
    prodFabricante?: boolean
    prodQuantidade?: boolean
    prodValidade?: boolean
    prodLote?: boolean
    prodCurso?: boolean
    prodTurma?: boolean
    curso?: boolean | CursoDefaultArgs<ExtArgs>
    turma?: boolean | TurmaDefaultArgs<ExtArgs>
    operacoes?: boolean | Produto$operacoesArgs<ExtArgs>
    _count?: boolean | ProdutoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["produto"]>

  export type ProdutoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idProduto?: boolean
    uuid?: boolean
    prodDescricao?: boolean
    prodFabricante?: boolean
    prodQuantidade?: boolean
    prodValidade?: boolean
    prodLote?: boolean
    prodCurso?: boolean
    prodTurma?: boolean
    curso?: boolean | CursoDefaultArgs<ExtArgs>
    turma?: boolean | TurmaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["produto"]>

  export type ProdutoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idProduto?: boolean
    uuid?: boolean
    prodDescricao?: boolean
    prodFabricante?: boolean
    prodQuantidade?: boolean
    prodValidade?: boolean
    prodLote?: boolean
    prodCurso?: boolean
    prodTurma?: boolean
    curso?: boolean | CursoDefaultArgs<ExtArgs>
    turma?: boolean | TurmaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["produto"]>

  export type ProdutoSelectScalar = {
    idProduto?: boolean
    uuid?: boolean
    prodDescricao?: boolean
    prodFabricante?: boolean
    prodQuantidade?: boolean
    prodValidade?: boolean
    prodLote?: boolean
    prodCurso?: boolean
    prodTurma?: boolean
  }

  export type ProdutoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"idProduto" | "uuid" | "prodDescricao" | "prodFabricante" | "prodQuantidade" | "prodValidade" | "prodLote" | "prodCurso" | "prodTurma", ExtArgs["result"]["produto"]>
  export type ProdutoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    curso?: boolean | CursoDefaultArgs<ExtArgs>
    turma?: boolean | TurmaDefaultArgs<ExtArgs>
    operacoes?: boolean | Produto$operacoesArgs<ExtArgs>
    _count?: boolean | ProdutoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProdutoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    curso?: boolean | CursoDefaultArgs<ExtArgs>
    turma?: boolean | TurmaDefaultArgs<ExtArgs>
  }
  export type ProdutoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    curso?: boolean | CursoDefaultArgs<ExtArgs>
    turma?: boolean | TurmaDefaultArgs<ExtArgs>
  }

  export type $ProdutoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Produto"
    objects: {
      curso: Prisma.$CursoPayload<ExtArgs>
      turma: Prisma.$TurmaPayload<ExtArgs>
      operacoes: Prisma.$OperacaoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      idProduto: number
      uuid: string
      prodDescricao: string
      prodFabricante: string
      prodQuantidade: number
      prodValidade: Date
      prodLote: string
      prodCurso: number
      prodTurma: number
    }, ExtArgs["result"]["produto"]>
    composites: {}
  }

  type ProdutoGetPayload<S extends boolean | null | undefined | ProdutoDefaultArgs> = $Result.GetResult<Prisma.$ProdutoPayload, S>

  type ProdutoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProdutoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProdutoCountAggregateInputType | true
    }

  export interface ProdutoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Produto'], meta: { name: 'Produto' } }
    /**
     * Find zero or one Produto that matches the filter.
     * @param {ProdutoFindUniqueArgs} args - Arguments to find a Produto
     * @example
     * // Get one Produto
     * const produto = await prisma.produto.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProdutoFindUniqueArgs>(args: SelectSubset<T, ProdutoFindUniqueArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Produto that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProdutoFindUniqueOrThrowArgs} args - Arguments to find a Produto
     * @example
     * // Get one Produto
     * const produto = await prisma.produto.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProdutoFindUniqueOrThrowArgs>(args: SelectSubset<T, ProdutoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Produto that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoFindFirstArgs} args - Arguments to find a Produto
     * @example
     * // Get one Produto
     * const produto = await prisma.produto.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProdutoFindFirstArgs>(args?: SelectSubset<T, ProdutoFindFirstArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Produto that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoFindFirstOrThrowArgs} args - Arguments to find a Produto
     * @example
     * // Get one Produto
     * const produto = await prisma.produto.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProdutoFindFirstOrThrowArgs>(args?: SelectSubset<T, ProdutoFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Produtos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Produtos
     * const produtos = await prisma.produto.findMany()
     * 
     * // Get first 10 Produtos
     * const produtos = await prisma.produto.findMany({ take: 10 })
     * 
     * // Only select the `idProduto`
     * const produtoWithIdProdutoOnly = await prisma.produto.findMany({ select: { idProduto: true } })
     * 
     */
    findMany<T extends ProdutoFindManyArgs>(args?: SelectSubset<T, ProdutoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Produto.
     * @param {ProdutoCreateArgs} args - Arguments to create a Produto.
     * @example
     * // Create one Produto
     * const Produto = await prisma.produto.create({
     *   data: {
     *     // ... data to create a Produto
     *   }
     * })
     * 
     */
    create<T extends ProdutoCreateArgs>(args: SelectSubset<T, ProdutoCreateArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Produtos.
     * @param {ProdutoCreateManyArgs} args - Arguments to create many Produtos.
     * @example
     * // Create many Produtos
     * const produto = await prisma.produto.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProdutoCreateManyArgs>(args?: SelectSubset<T, ProdutoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Produtos and returns the data saved in the database.
     * @param {ProdutoCreateManyAndReturnArgs} args - Arguments to create many Produtos.
     * @example
     * // Create many Produtos
     * const produto = await prisma.produto.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Produtos and only return the `idProduto`
     * const produtoWithIdProdutoOnly = await prisma.produto.createManyAndReturn({
     *   select: { idProduto: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProdutoCreateManyAndReturnArgs>(args?: SelectSubset<T, ProdutoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Produto.
     * @param {ProdutoDeleteArgs} args - Arguments to delete one Produto.
     * @example
     * // Delete one Produto
     * const Produto = await prisma.produto.delete({
     *   where: {
     *     // ... filter to delete one Produto
     *   }
     * })
     * 
     */
    delete<T extends ProdutoDeleteArgs>(args: SelectSubset<T, ProdutoDeleteArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Produto.
     * @param {ProdutoUpdateArgs} args - Arguments to update one Produto.
     * @example
     * // Update one Produto
     * const produto = await prisma.produto.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProdutoUpdateArgs>(args: SelectSubset<T, ProdutoUpdateArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Produtos.
     * @param {ProdutoDeleteManyArgs} args - Arguments to filter Produtos to delete.
     * @example
     * // Delete a few Produtos
     * const { count } = await prisma.produto.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProdutoDeleteManyArgs>(args?: SelectSubset<T, ProdutoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Produtos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Produtos
     * const produto = await prisma.produto.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProdutoUpdateManyArgs>(args: SelectSubset<T, ProdutoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Produtos and returns the data updated in the database.
     * @param {ProdutoUpdateManyAndReturnArgs} args - Arguments to update many Produtos.
     * @example
     * // Update many Produtos
     * const produto = await prisma.produto.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Produtos and only return the `idProduto`
     * const produtoWithIdProdutoOnly = await prisma.produto.updateManyAndReturn({
     *   select: { idProduto: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProdutoUpdateManyAndReturnArgs>(args: SelectSubset<T, ProdutoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Produto.
     * @param {ProdutoUpsertArgs} args - Arguments to update or create a Produto.
     * @example
     * // Update or create a Produto
     * const produto = await prisma.produto.upsert({
     *   create: {
     *     // ... data to create a Produto
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Produto we want to update
     *   }
     * })
     */
    upsert<T extends ProdutoUpsertArgs>(args: SelectSubset<T, ProdutoUpsertArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Produtos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoCountArgs} args - Arguments to filter Produtos to count.
     * @example
     * // Count the number of Produtos
     * const count = await prisma.produto.count({
     *   where: {
     *     // ... the filter for the Produtos we want to count
     *   }
     * })
    **/
    count<T extends ProdutoCountArgs>(
      args?: Subset<T, ProdutoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProdutoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Produto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProdutoAggregateArgs>(args: Subset<T, ProdutoAggregateArgs>): Prisma.PrismaPromise<GetProdutoAggregateType<T>>

    /**
     * Group by Produto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProdutoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProdutoGroupByArgs['orderBy'] }
        : { orderBy?: ProdutoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProdutoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProdutoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Produto model
   */
  readonly fields: ProdutoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Produto.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProdutoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    curso<T extends CursoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CursoDefaultArgs<ExtArgs>>): Prisma__CursoClient<$Result.GetResult<Prisma.$CursoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    turma<T extends TurmaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TurmaDefaultArgs<ExtArgs>>): Prisma__TurmaClient<$Result.GetResult<Prisma.$TurmaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    operacoes<T extends Produto$operacoesArgs<ExtArgs> = {}>(args?: Subset<T, Produto$operacoesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OperacaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Produto model
   */
  interface ProdutoFieldRefs {
    readonly idProduto: FieldRef<"Produto", 'Int'>
    readonly uuid: FieldRef<"Produto", 'String'>
    readonly prodDescricao: FieldRef<"Produto", 'String'>
    readonly prodFabricante: FieldRef<"Produto", 'String'>
    readonly prodQuantidade: FieldRef<"Produto", 'Int'>
    readonly prodValidade: FieldRef<"Produto", 'DateTime'>
    readonly prodLote: FieldRef<"Produto", 'String'>
    readonly prodCurso: FieldRef<"Produto", 'Int'>
    readonly prodTurma: FieldRef<"Produto", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Produto findUnique
   */
  export type ProdutoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    /**
     * Filter, which Produto to fetch.
     */
    where: ProdutoWhereUniqueInput
  }

  /**
   * Produto findUniqueOrThrow
   */
  export type ProdutoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    /**
     * Filter, which Produto to fetch.
     */
    where: ProdutoWhereUniqueInput
  }

  /**
   * Produto findFirst
   */
  export type ProdutoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    /**
     * Filter, which Produto to fetch.
     */
    where?: ProdutoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Produtos to fetch.
     */
    orderBy?: ProdutoOrderByWithRelationInput | ProdutoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Produtos.
     */
    cursor?: ProdutoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Produtos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Produtos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Produtos.
     */
    distinct?: ProdutoScalarFieldEnum | ProdutoScalarFieldEnum[]
  }

  /**
   * Produto findFirstOrThrow
   */
  export type ProdutoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    /**
     * Filter, which Produto to fetch.
     */
    where?: ProdutoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Produtos to fetch.
     */
    orderBy?: ProdutoOrderByWithRelationInput | ProdutoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Produtos.
     */
    cursor?: ProdutoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Produtos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Produtos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Produtos.
     */
    distinct?: ProdutoScalarFieldEnum | ProdutoScalarFieldEnum[]
  }

  /**
   * Produto findMany
   */
  export type ProdutoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    /**
     * Filter, which Produtos to fetch.
     */
    where?: ProdutoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Produtos to fetch.
     */
    orderBy?: ProdutoOrderByWithRelationInput | ProdutoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Produtos.
     */
    cursor?: ProdutoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Produtos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Produtos.
     */
    skip?: number
    distinct?: ProdutoScalarFieldEnum | ProdutoScalarFieldEnum[]
  }

  /**
   * Produto create
   */
  export type ProdutoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    /**
     * The data needed to create a Produto.
     */
    data: XOR<ProdutoCreateInput, ProdutoUncheckedCreateInput>
  }

  /**
   * Produto createMany
   */
  export type ProdutoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Produtos.
     */
    data: ProdutoCreateManyInput | ProdutoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Produto createManyAndReturn
   */
  export type ProdutoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * The data used to create many Produtos.
     */
    data: ProdutoCreateManyInput | ProdutoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Produto update
   */
  export type ProdutoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    /**
     * The data needed to update a Produto.
     */
    data: XOR<ProdutoUpdateInput, ProdutoUncheckedUpdateInput>
    /**
     * Choose, which Produto to update.
     */
    where: ProdutoWhereUniqueInput
  }

  /**
   * Produto updateMany
   */
  export type ProdutoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Produtos.
     */
    data: XOR<ProdutoUpdateManyMutationInput, ProdutoUncheckedUpdateManyInput>
    /**
     * Filter which Produtos to update
     */
    where?: ProdutoWhereInput
    /**
     * Limit how many Produtos to update.
     */
    limit?: number
  }

  /**
   * Produto updateManyAndReturn
   */
  export type ProdutoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * The data used to update Produtos.
     */
    data: XOR<ProdutoUpdateManyMutationInput, ProdutoUncheckedUpdateManyInput>
    /**
     * Filter which Produtos to update
     */
    where?: ProdutoWhereInput
    /**
     * Limit how many Produtos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Produto upsert
   */
  export type ProdutoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    /**
     * The filter to search for the Produto to update in case it exists.
     */
    where: ProdutoWhereUniqueInput
    /**
     * In case the Produto found by the `where` argument doesn't exist, create a new Produto with this data.
     */
    create: XOR<ProdutoCreateInput, ProdutoUncheckedCreateInput>
    /**
     * In case the Produto was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProdutoUpdateInput, ProdutoUncheckedUpdateInput>
  }

  /**
   * Produto delete
   */
  export type ProdutoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    /**
     * Filter which Produto to delete.
     */
    where: ProdutoWhereUniqueInput
  }

  /**
   * Produto deleteMany
   */
  export type ProdutoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Produtos to delete
     */
    where?: ProdutoWhereInput
    /**
     * Limit how many Produtos to delete.
     */
    limit?: number
  }

  /**
   * Produto.operacoes
   */
  export type Produto$operacoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operacao
     */
    select?: OperacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operacao
     */
    omit?: OperacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperacaoInclude<ExtArgs> | null
    where?: OperacaoWhereInput
    orderBy?: OperacaoOrderByWithRelationInput | OperacaoOrderByWithRelationInput[]
    cursor?: OperacaoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OperacaoScalarFieldEnum | OperacaoScalarFieldEnum[]
  }

  /**
   * Produto without action
   */
  export type ProdutoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
  }


  /**
   * Model Operacao
   */

  export type AggregateOperacao = {
    _count: OperacaoCountAggregateOutputType | null
    _avg: OperacaoAvgAggregateOutputType | null
    _sum: OperacaoSumAggregateOutputType | null
    _min: OperacaoMinAggregateOutputType | null
    _max: OperacaoMaxAggregateOutputType | null
  }

  export type OperacaoAvgAggregateOutputType = {
    idOperacao: number | null
    tipoOperacao: number | null
    idUsuario: number | null
    idProduto: number | null
    quantidade: number | null
  }

  export type OperacaoSumAggregateOutputType = {
    idOperacao: number | null
    tipoOperacao: number | null
    idUsuario: number | null
    idProduto: number | null
    quantidade: number | null
  }

  export type OperacaoMinAggregateOutputType = {
    idOperacao: number | null
    tipoOperacao: number | null
    idUsuario: number | null
    idProduto: number | null
    data: Date | null
    quantidade: number | null
  }

  export type OperacaoMaxAggregateOutputType = {
    idOperacao: number | null
    tipoOperacao: number | null
    idUsuario: number | null
    idProduto: number | null
    data: Date | null
    quantidade: number | null
  }

  export type OperacaoCountAggregateOutputType = {
    idOperacao: number
    tipoOperacao: number
    idUsuario: number
    idProduto: number
    data: number
    quantidade: number
    _all: number
  }


  export type OperacaoAvgAggregateInputType = {
    idOperacao?: true
    tipoOperacao?: true
    idUsuario?: true
    idProduto?: true
    quantidade?: true
  }

  export type OperacaoSumAggregateInputType = {
    idOperacao?: true
    tipoOperacao?: true
    idUsuario?: true
    idProduto?: true
    quantidade?: true
  }

  export type OperacaoMinAggregateInputType = {
    idOperacao?: true
    tipoOperacao?: true
    idUsuario?: true
    idProduto?: true
    data?: true
    quantidade?: true
  }

  export type OperacaoMaxAggregateInputType = {
    idOperacao?: true
    tipoOperacao?: true
    idUsuario?: true
    idProduto?: true
    data?: true
    quantidade?: true
  }

  export type OperacaoCountAggregateInputType = {
    idOperacao?: true
    tipoOperacao?: true
    idUsuario?: true
    idProduto?: true
    data?: true
    quantidade?: true
    _all?: true
  }

  export type OperacaoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Operacao to aggregate.
     */
    where?: OperacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Operacaos to fetch.
     */
    orderBy?: OperacaoOrderByWithRelationInput | OperacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OperacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Operacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Operacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Operacaos
    **/
    _count?: true | OperacaoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OperacaoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OperacaoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OperacaoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OperacaoMaxAggregateInputType
  }

  export type GetOperacaoAggregateType<T extends OperacaoAggregateArgs> = {
        [P in keyof T & keyof AggregateOperacao]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOperacao[P]>
      : GetScalarType<T[P], AggregateOperacao[P]>
  }




  export type OperacaoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OperacaoWhereInput
    orderBy?: OperacaoOrderByWithAggregationInput | OperacaoOrderByWithAggregationInput[]
    by: OperacaoScalarFieldEnum[] | OperacaoScalarFieldEnum
    having?: OperacaoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OperacaoCountAggregateInputType | true
    _avg?: OperacaoAvgAggregateInputType
    _sum?: OperacaoSumAggregateInputType
    _min?: OperacaoMinAggregateInputType
    _max?: OperacaoMaxAggregateInputType
  }

  export type OperacaoGroupByOutputType = {
    idOperacao: number
    tipoOperacao: number
    idUsuario: number
    idProduto: number
    data: Date
    quantidade: number
    _count: OperacaoCountAggregateOutputType | null
    _avg: OperacaoAvgAggregateOutputType | null
    _sum: OperacaoSumAggregateOutputType | null
    _min: OperacaoMinAggregateOutputType | null
    _max: OperacaoMaxAggregateOutputType | null
  }

  type GetOperacaoGroupByPayload<T extends OperacaoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OperacaoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OperacaoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OperacaoGroupByOutputType[P]>
            : GetScalarType<T[P], OperacaoGroupByOutputType[P]>
        }
      >
    >


  export type OperacaoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idOperacao?: boolean
    tipoOperacao?: boolean
    idUsuario?: boolean
    idProduto?: boolean
    data?: boolean
    quantidade?: boolean
    usuario?: boolean | UserDefaultArgs<ExtArgs>
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["operacao"]>

  export type OperacaoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idOperacao?: boolean
    tipoOperacao?: boolean
    idUsuario?: boolean
    idProduto?: boolean
    data?: boolean
    quantidade?: boolean
    usuario?: boolean | UserDefaultArgs<ExtArgs>
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["operacao"]>

  export type OperacaoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idOperacao?: boolean
    tipoOperacao?: boolean
    idUsuario?: boolean
    idProduto?: boolean
    data?: boolean
    quantidade?: boolean
    usuario?: boolean | UserDefaultArgs<ExtArgs>
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["operacao"]>

  export type OperacaoSelectScalar = {
    idOperacao?: boolean
    tipoOperacao?: boolean
    idUsuario?: boolean
    idProduto?: boolean
    data?: boolean
    quantidade?: boolean
  }

  export type OperacaoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"idOperacao" | "tipoOperacao" | "idUsuario" | "idProduto" | "data" | "quantidade", ExtArgs["result"]["operacao"]>
  export type OperacaoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UserDefaultArgs<ExtArgs>
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
  }
  export type OperacaoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UserDefaultArgs<ExtArgs>
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
  }
  export type OperacaoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UserDefaultArgs<ExtArgs>
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
  }

  export type $OperacaoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Operacao"
    objects: {
      usuario: Prisma.$UserPayload<ExtArgs>
      produto: Prisma.$ProdutoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      idOperacao: number
      tipoOperacao: number
      idUsuario: number
      idProduto: number
      data: Date
      quantidade: number
    }, ExtArgs["result"]["operacao"]>
    composites: {}
  }

  type OperacaoGetPayload<S extends boolean | null | undefined | OperacaoDefaultArgs> = $Result.GetResult<Prisma.$OperacaoPayload, S>

  type OperacaoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OperacaoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OperacaoCountAggregateInputType | true
    }

  export interface OperacaoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Operacao'], meta: { name: 'Operacao' } }
    /**
     * Find zero or one Operacao that matches the filter.
     * @param {OperacaoFindUniqueArgs} args - Arguments to find a Operacao
     * @example
     * // Get one Operacao
     * const operacao = await prisma.operacao.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OperacaoFindUniqueArgs>(args: SelectSubset<T, OperacaoFindUniqueArgs<ExtArgs>>): Prisma__OperacaoClient<$Result.GetResult<Prisma.$OperacaoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Operacao that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OperacaoFindUniqueOrThrowArgs} args - Arguments to find a Operacao
     * @example
     * // Get one Operacao
     * const operacao = await prisma.operacao.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OperacaoFindUniqueOrThrowArgs>(args: SelectSubset<T, OperacaoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OperacaoClient<$Result.GetResult<Prisma.$OperacaoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Operacao that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperacaoFindFirstArgs} args - Arguments to find a Operacao
     * @example
     * // Get one Operacao
     * const operacao = await prisma.operacao.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OperacaoFindFirstArgs>(args?: SelectSubset<T, OperacaoFindFirstArgs<ExtArgs>>): Prisma__OperacaoClient<$Result.GetResult<Prisma.$OperacaoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Operacao that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperacaoFindFirstOrThrowArgs} args - Arguments to find a Operacao
     * @example
     * // Get one Operacao
     * const operacao = await prisma.operacao.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OperacaoFindFirstOrThrowArgs>(args?: SelectSubset<T, OperacaoFindFirstOrThrowArgs<ExtArgs>>): Prisma__OperacaoClient<$Result.GetResult<Prisma.$OperacaoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Operacaos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperacaoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Operacaos
     * const operacaos = await prisma.operacao.findMany()
     * 
     * // Get first 10 Operacaos
     * const operacaos = await prisma.operacao.findMany({ take: 10 })
     * 
     * // Only select the `idOperacao`
     * const operacaoWithIdOperacaoOnly = await prisma.operacao.findMany({ select: { idOperacao: true } })
     * 
     */
    findMany<T extends OperacaoFindManyArgs>(args?: SelectSubset<T, OperacaoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OperacaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Operacao.
     * @param {OperacaoCreateArgs} args - Arguments to create a Operacao.
     * @example
     * // Create one Operacao
     * const Operacao = await prisma.operacao.create({
     *   data: {
     *     // ... data to create a Operacao
     *   }
     * })
     * 
     */
    create<T extends OperacaoCreateArgs>(args: SelectSubset<T, OperacaoCreateArgs<ExtArgs>>): Prisma__OperacaoClient<$Result.GetResult<Prisma.$OperacaoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Operacaos.
     * @param {OperacaoCreateManyArgs} args - Arguments to create many Operacaos.
     * @example
     * // Create many Operacaos
     * const operacao = await prisma.operacao.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OperacaoCreateManyArgs>(args?: SelectSubset<T, OperacaoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Operacaos and returns the data saved in the database.
     * @param {OperacaoCreateManyAndReturnArgs} args - Arguments to create many Operacaos.
     * @example
     * // Create many Operacaos
     * const operacao = await prisma.operacao.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Operacaos and only return the `idOperacao`
     * const operacaoWithIdOperacaoOnly = await prisma.operacao.createManyAndReturn({
     *   select: { idOperacao: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OperacaoCreateManyAndReturnArgs>(args?: SelectSubset<T, OperacaoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OperacaoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Operacao.
     * @param {OperacaoDeleteArgs} args - Arguments to delete one Operacao.
     * @example
     * // Delete one Operacao
     * const Operacao = await prisma.operacao.delete({
     *   where: {
     *     // ... filter to delete one Operacao
     *   }
     * })
     * 
     */
    delete<T extends OperacaoDeleteArgs>(args: SelectSubset<T, OperacaoDeleteArgs<ExtArgs>>): Prisma__OperacaoClient<$Result.GetResult<Prisma.$OperacaoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Operacao.
     * @param {OperacaoUpdateArgs} args - Arguments to update one Operacao.
     * @example
     * // Update one Operacao
     * const operacao = await prisma.operacao.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OperacaoUpdateArgs>(args: SelectSubset<T, OperacaoUpdateArgs<ExtArgs>>): Prisma__OperacaoClient<$Result.GetResult<Prisma.$OperacaoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Operacaos.
     * @param {OperacaoDeleteManyArgs} args - Arguments to filter Operacaos to delete.
     * @example
     * // Delete a few Operacaos
     * const { count } = await prisma.operacao.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OperacaoDeleteManyArgs>(args?: SelectSubset<T, OperacaoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Operacaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperacaoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Operacaos
     * const operacao = await prisma.operacao.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OperacaoUpdateManyArgs>(args: SelectSubset<T, OperacaoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Operacaos and returns the data updated in the database.
     * @param {OperacaoUpdateManyAndReturnArgs} args - Arguments to update many Operacaos.
     * @example
     * // Update many Operacaos
     * const operacao = await prisma.operacao.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Operacaos and only return the `idOperacao`
     * const operacaoWithIdOperacaoOnly = await prisma.operacao.updateManyAndReturn({
     *   select: { idOperacao: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OperacaoUpdateManyAndReturnArgs>(args: SelectSubset<T, OperacaoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OperacaoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Operacao.
     * @param {OperacaoUpsertArgs} args - Arguments to update or create a Operacao.
     * @example
     * // Update or create a Operacao
     * const operacao = await prisma.operacao.upsert({
     *   create: {
     *     // ... data to create a Operacao
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Operacao we want to update
     *   }
     * })
     */
    upsert<T extends OperacaoUpsertArgs>(args: SelectSubset<T, OperacaoUpsertArgs<ExtArgs>>): Prisma__OperacaoClient<$Result.GetResult<Prisma.$OperacaoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Operacaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperacaoCountArgs} args - Arguments to filter Operacaos to count.
     * @example
     * // Count the number of Operacaos
     * const count = await prisma.operacao.count({
     *   where: {
     *     // ... the filter for the Operacaos we want to count
     *   }
     * })
    **/
    count<T extends OperacaoCountArgs>(
      args?: Subset<T, OperacaoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OperacaoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Operacao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperacaoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OperacaoAggregateArgs>(args: Subset<T, OperacaoAggregateArgs>): Prisma.PrismaPromise<GetOperacaoAggregateType<T>>

    /**
     * Group by Operacao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperacaoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OperacaoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OperacaoGroupByArgs['orderBy'] }
        : { orderBy?: OperacaoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OperacaoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOperacaoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Operacao model
   */
  readonly fields: OperacaoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Operacao.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OperacaoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuario<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    produto<T extends ProdutoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProdutoDefaultArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Operacao model
   */
  interface OperacaoFieldRefs {
    readonly idOperacao: FieldRef<"Operacao", 'Int'>
    readonly tipoOperacao: FieldRef<"Operacao", 'Int'>
    readonly idUsuario: FieldRef<"Operacao", 'Int'>
    readonly idProduto: FieldRef<"Operacao", 'Int'>
    readonly data: FieldRef<"Operacao", 'DateTime'>
    readonly quantidade: FieldRef<"Operacao", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Operacao findUnique
   */
  export type OperacaoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operacao
     */
    select?: OperacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operacao
     */
    omit?: OperacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperacaoInclude<ExtArgs> | null
    /**
     * Filter, which Operacao to fetch.
     */
    where: OperacaoWhereUniqueInput
  }

  /**
   * Operacao findUniqueOrThrow
   */
  export type OperacaoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operacao
     */
    select?: OperacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operacao
     */
    omit?: OperacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperacaoInclude<ExtArgs> | null
    /**
     * Filter, which Operacao to fetch.
     */
    where: OperacaoWhereUniqueInput
  }

  /**
   * Operacao findFirst
   */
  export type OperacaoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operacao
     */
    select?: OperacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operacao
     */
    omit?: OperacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperacaoInclude<ExtArgs> | null
    /**
     * Filter, which Operacao to fetch.
     */
    where?: OperacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Operacaos to fetch.
     */
    orderBy?: OperacaoOrderByWithRelationInput | OperacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Operacaos.
     */
    cursor?: OperacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Operacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Operacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Operacaos.
     */
    distinct?: OperacaoScalarFieldEnum | OperacaoScalarFieldEnum[]
  }

  /**
   * Operacao findFirstOrThrow
   */
  export type OperacaoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operacao
     */
    select?: OperacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operacao
     */
    omit?: OperacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperacaoInclude<ExtArgs> | null
    /**
     * Filter, which Operacao to fetch.
     */
    where?: OperacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Operacaos to fetch.
     */
    orderBy?: OperacaoOrderByWithRelationInput | OperacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Operacaos.
     */
    cursor?: OperacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Operacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Operacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Operacaos.
     */
    distinct?: OperacaoScalarFieldEnum | OperacaoScalarFieldEnum[]
  }

  /**
   * Operacao findMany
   */
  export type OperacaoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operacao
     */
    select?: OperacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operacao
     */
    omit?: OperacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperacaoInclude<ExtArgs> | null
    /**
     * Filter, which Operacaos to fetch.
     */
    where?: OperacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Operacaos to fetch.
     */
    orderBy?: OperacaoOrderByWithRelationInput | OperacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Operacaos.
     */
    cursor?: OperacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Operacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Operacaos.
     */
    skip?: number
    distinct?: OperacaoScalarFieldEnum | OperacaoScalarFieldEnum[]
  }

  /**
   * Operacao create
   */
  export type OperacaoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operacao
     */
    select?: OperacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operacao
     */
    omit?: OperacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperacaoInclude<ExtArgs> | null
    /**
     * The data needed to create a Operacao.
     */
    data: XOR<OperacaoCreateInput, OperacaoUncheckedCreateInput>
  }

  /**
   * Operacao createMany
   */
  export type OperacaoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Operacaos.
     */
    data: OperacaoCreateManyInput | OperacaoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Operacao createManyAndReturn
   */
  export type OperacaoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operacao
     */
    select?: OperacaoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Operacao
     */
    omit?: OperacaoOmit<ExtArgs> | null
    /**
     * The data used to create many Operacaos.
     */
    data: OperacaoCreateManyInput | OperacaoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperacaoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Operacao update
   */
  export type OperacaoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operacao
     */
    select?: OperacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operacao
     */
    omit?: OperacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperacaoInclude<ExtArgs> | null
    /**
     * The data needed to update a Operacao.
     */
    data: XOR<OperacaoUpdateInput, OperacaoUncheckedUpdateInput>
    /**
     * Choose, which Operacao to update.
     */
    where: OperacaoWhereUniqueInput
  }

  /**
   * Operacao updateMany
   */
  export type OperacaoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Operacaos.
     */
    data: XOR<OperacaoUpdateManyMutationInput, OperacaoUncheckedUpdateManyInput>
    /**
     * Filter which Operacaos to update
     */
    where?: OperacaoWhereInput
    /**
     * Limit how many Operacaos to update.
     */
    limit?: number
  }

  /**
   * Operacao updateManyAndReturn
   */
  export type OperacaoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operacao
     */
    select?: OperacaoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Operacao
     */
    omit?: OperacaoOmit<ExtArgs> | null
    /**
     * The data used to update Operacaos.
     */
    data: XOR<OperacaoUpdateManyMutationInput, OperacaoUncheckedUpdateManyInput>
    /**
     * Filter which Operacaos to update
     */
    where?: OperacaoWhereInput
    /**
     * Limit how many Operacaos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperacaoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Operacao upsert
   */
  export type OperacaoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operacao
     */
    select?: OperacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operacao
     */
    omit?: OperacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperacaoInclude<ExtArgs> | null
    /**
     * The filter to search for the Operacao to update in case it exists.
     */
    where: OperacaoWhereUniqueInput
    /**
     * In case the Operacao found by the `where` argument doesn't exist, create a new Operacao with this data.
     */
    create: XOR<OperacaoCreateInput, OperacaoUncheckedCreateInput>
    /**
     * In case the Operacao was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OperacaoUpdateInput, OperacaoUncheckedUpdateInput>
  }

  /**
   * Operacao delete
   */
  export type OperacaoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operacao
     */
    select?: OperacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operacao
     */
    omit?: OperacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperacaoInclude<ExtArgs> | null
    /**
     * Filter which Operacao to delete.
     */
    where: OperacaoWhereUniqueInput
  }

  /**
   * Operacao deleteMany
   */
  export type OperacaoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Operacaos to delete
     */
    where?: OperacaoWhereInput
    /**
     * Limit how many Operacaos to delete.
     */
    limit?: number
  }

  /**
   * Operacao without action
   */
  export type OperacaoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operacao
     */
    select?: OperacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operacao
     */
    omit?: OperacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperacaoInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CursoScalarFieldEnum: {
    idCurso: 'idCurso',
    nomeCurso: 'nomeCurso',
    status: 'status'
  };

  export type CursoScalarFieldEnum = (typeof CursoScalarFieldEnum)[keyof typeof CursoScalarFieldEnum]


  export const UserScalarFieldEnum: {
    idUser: 'idUser',
    nome: 'nome',
    email: 'email',
    password: 'password',
    role: 'role',
    idCurso: 'idCurso',
    status: 'status',
    created_by: 'created_by',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const TurmaScalarFieldEnum: {
    idTurma: 'idTurma',
    uuid: 'uuid',
    codigoTurma: 'codigoTurma',
    turnoTurma: 'turnoTurma',
    idCurso: 'idCurso',
    status: 'status'
  };

  export type TurmaScalarFieldEnum = (typeof TurmaScalarFieldEnum)[keyof typeof TurmaScalarFieldEnum]


  export const ProdutoScalarFieldEnum: {
    idProduto: 'idProduto',
    uuid: 'uuid',
    prodDescricao: 'prodDescricao',
    prodFabricante: 'prodFabricante',
    prodQuantidade: 'prodQuantidade',
    prodValidade: 'prodValidade',
    prodLote: 'prodLote',
    prodCurso: 'prodCurso',
    prodTurma: 'prodTurma'
  };

  export type ProdutoScalarFieldEnum = (typeof ProdutoScalarFieldEnum)[keyof typeof ProdutoScalarFieldEnum]


  export const OperacaoScalarFieldEnum: {
    idOperacao: 'idOperacao',
    tipoOperacao: 'tipoOperacao',
    idUsuario: 'idUsuario',
    idProduto: 'idProduto',
    data: 'data',
    quantidade: 'quantidade'
  };

  export type OperacaoScalarFieldEnum = (typeof OperacaoScalarFieldEnum)[keyof typeof OperacaoScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type CursoWhereInput = {
    AND?: CursoWhereInput | CursoWhereInput[]
    OR?: CursoWhereInput[]
    NOT?: CursoWhereInput | CursoWhereInput[]
    idCurso?: IntFilter<"Curso"> | number
    nomeCurso?: StringFilter<"Curso"> | string
    status?: BoolFilter<"Curso"> | boolean
    turmas?: TurmaListRelationFilter
    produtos?: ProdutoListRelationFilter
    users?: UserListRelationFilter
  }

  export type CursoOrderByWithRelationInput = {
    idCurso?: SortOrder
    nomeCurso?: SortOrder
    status?: SortOrder
    turmas?: TurmaOrderByRelationAggregateInput
    produtos?: ProdutoOrderByRelationAggregateInput
    users?: UserOrderByRelationAggregateInput
  }

  export type CursoWhereUniqueInput = Prisma.AtLeast<{
    idCurso?: number
    nomeCurso?: string
    AND?: CursoWhereInput | CursoWhereInput[]
    OR?: CursoWhereInput[]
    NOT?: CursoWhereInput | CursoWhereInput[]
    status?: BoolFilter<"Curso"> | boolean
    turmas?: TurmaListRelationFilter
    produtos?: ProdutoListRelationFilter
    users?: UserListRelationFilter
  }, "idCurso" | "nomeCurso">

  export type CursoOrderByWithAggregationInput = {
    idCurso?: SortOrder
    nomeCurso?: SortOrder
    status?: SortOrder
    _count?: CursoCountOrderByAggregateInput
    _avg?: CursoAvgOrderByAggregateInput
    _max?: CursoMaxOrderByAggregateInput
    _min?: CursoMinOrderByAggregateInput
    _sum?: CursoSumOrderByAggregateInput
  }

  export type CursoScalarWhereWithAggregatesInput = {
    AND?: CursoScalarWhereWithAggregatesInput | CursoScalarWhereWithAggregatesInput[]
    OR?: CursoScalarWhereWithAggregatesInput[]
    NOT?: CursoScalarWhereWithAggregatesInput | CursoScalarWhereWithAggregatesInput[]
    idCurso?: IntWithAggregatesFilter<"Curso"> | number
    nomeCurso?: StringWithAggregatesFilter<"Curso"> | string
    status?: BoolWithAggregatesFilter<"Curso"> | boolean
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    idUser?: IntFilter<"User"> | number
    nome?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    idCurso?: IntNullableFilter<"User"> | number | null
    status?: BoolFilter<"User"> | boolean
    created_by?: IntFilter<"User"> | number
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    curso?: XOR<CursoNullableScalarRelationFilter, CursoWhereInput> | null
    operacoes?: OperacaoListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    idUser?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    idCurso?: SortOrderInput | SortOrder
    status?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    curso?: CursoOrderByWithRelationInput
    operacoes?: OperacaoOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    idUser?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    nome?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    idCurso?: IntNullableFilter<"User"> | number | null
    status?: BoolFilter<"User"> | boolean
    created_by?: IntFilter<"User"> | number
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    curso?: XOR<CursoNullableScalarRelationFilter, CursoWhereInput> | null
    operacoes?: OperacaoListRelationFilter
  }, "idUser" | "email">

  export type UserOrderByWithAggregationInput = {
    idUser?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    idCurso?: SortOrderInput | SortOrder
    status?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    idUser?: IntWithAggregatesFilter<"User"> | number
    nome?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    idCurso?: IntNullableWithAggregatesFilter<"User"> | number | null
    status?: BoolWithAggregatesFilter<"User"> | boolean
    created_by?: IntWithAggregatesFilter<"User"> | number
    created_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type TurmaWhereInput = {
    AND?: TurmaWhereInput | TurmaWhereInput[]
    OR?: TurmaWhereInput[]
    NOT?: TurmaWhereInput | TurmaWhereInput[]
    idTurma?: IntFilter<"Turma"> | number
    uuid?: StringFilter<"Turma"> | string
    codigoTurma?: StringFilter<"Turma"> | string
    turnoTurma?: StringFilter<"Turma"> | string
    idCurso?: IntFilter<"Turma"> | number
    status?: BoolFilter<"Turma"> | boolean
    curso?: XOR<CursoScalarRelationFilter, CursoWhereInput>
    produtos?: ProdutoListRelationFilter
  }

  export type TurmaOrderByWithRelationInput = {
    idTurma?: SortOrder
    uuid?: SortOrder
    codigoTurma?: SortOrder
    turnoTurma?: SortOrder
    idCurso?: SortOrder
    status?: SortOrder
    curso?: CursoOrderByWithRelationInput
    produtos?: ProdutoOrderByRelationAggregateInput
  }

  export type TurmaWhereUniqueInput = Prisma.AtLeast<{
    idTurma?: number
    uuid?: string
    codigoTurma?: string
    AND?: TurmaWhereInput | TurmaWhereInput[]
    OR?: TurmaWhereInput[]
    NOT?: TurmaWhereInput | TurmaWhereInput[]
    turnoTurma?: StringFilter<"Turma"> | string
    idCurso?: IntFilter<"Turma"> | number
    status?: BoolFilter<"Turma"> | boolean
    curso?: XOR<CursoScalarRelationFilter, CursoWhereInput>
    produtos?: ProdutoListRelationFilter
  }, "idTurma" | "uuid" | "codigoTurma">

  export type TurmaOrderByWithAggregationInput = {
    idTurma?: SortOrder
    uuid?: SortOrder
    codigoTurma?: SortOrder
    turnoTurma?: SortOrder
    idCurso?: SortOrder
    status?: SortOrder
    _count?: TurmaCountOrderByAggregateInput
    _avg?: TurmaAvgOrderByAggregateInput
    _max?: TurmaMaxOrderByAggregateInput
    _min?: TurmaMinOrderByAggregateInput
    _sum?: TurmaSumOrderByAggregateInput
  }

  export type TurmaScalarWhereWithAggregatesInput = {
    AND?: TurmaScalarWhereWithAggregatesInput | TurmaScalarWhereWithAggregatesInput[]
    OR?: TurmaScalarWhereWithAggregatesInput[]
    NOT?: TurmaScalarWhereWithAggregatesInput | TurmaScalarWhereWithAggregatesInput[]
    idTurma?: IntWithAggregatesFilter<"Turma"> | number
    uuid?: StringWithAggregatesFilter<"Turma"> | string
    codigoTurma?: StringWithAggregatesFilter<"Turma"> | string
    turnoTurma?: StringWithAggregatesFilter<"Turma"> | string
    idCurso?: IntWithAggregatesFilter<"Turma"> | number
    status?: BoolWithAggregatesFilter<"Turma"> | boolean
  }

  export type ProdutoWhereInput = {
    AND?: ProdutoWhereInput | ProdutoWhereInput[]
    OR?: ProdutoWhereInput[]
    NOT?: ProdutoWhereInput | ProdutoWhereInput[]
    idProduto?: IntFilter<"Produto"> | number
    uuid?: StringFilter<"Produto"> | string
    prodDescricao?: StringFilter<"Produto"> | string
    prodFabricante?: StringFilter<"Produto"> | string
    prodQuantidade?: IntFilter<"Produto"> | number
    prodValidade?: DateTimeFilter<"Produto"> | Date | string
    prodLote?: StringFilter<"Produto"> | string
    prodCurso?: IntFilter<"Produto"> | number
    prodTurma?: IntFilter<"Produto"> | number
    curso?: XOR<CursoScalarRelationFilter, CursoWhereInput>
    turma?: XOR<TurmaScalarRelationFilter, TurmaWhereInput>
    operacoes?: OperacaoListRelationFilter
  }

  export type ProdutoOrderByWithRelationInput = {
    idProduto?: SortOrder
    uuid?: SortOrder
    prodDescricao?: SortOrder
    prodFabricante?: SortOrder
    prodQuantidade?: SortOrder
    prodValidade?: SortOrder
    prodLote?: SortOrder
    prodCurso?: SortOrder
    prodTurma?: SortOrder
    curso?: CursoOrderByWithRelationInput
    turma?: TurmaOrderByWithRelationInput
    operacoes?: OperacaoOrderByRelationAggregateInput
  }

  export type ProdutoWhereUniqueInput = Prisma.AtLeast<{
    idProduto?: number
    uuid?: string
    prodDescricao?: string
    AND?: ProdutoWhereInput | ProdutoWhereInput[]
    OR?: ProdutoWhereInput[]
    NOT?: ProdutoWhereInput | ProdutoWhereInput[]
    prodFabricante?: StringFilter<"Produto"> | string
    prodQuantidade?: IntFilter<"Produto"> | number
    prodValidade?: DateTimeFilter<"Produto"> | Date | string
    prodLote?: StringFilter<"Produto"> | string
    prodCurso?: IntFilter<"Produto"> | number
    prodTurma?: IntFilter<"Produto"> | number
    curso?: XOR<CursoScalarRelationFilter, CursoWhereInput>
    turma?: XOR<TurmaScalarRelationFilter, TurmaWhereInput>
    operacoes?: OperacaoListRelationFilter
  }, "idProduto" | "uuid" | "prodDescricao">

  export type ProdutoOrderByWithAggregationInput = {
    idProduto?: SortOrder
    uuid?: SortOrder
    prodDescricao?: SortOrder
    prodFabricante?: SortOrder
    prodQuantidade?: SortOrder
    prodValidade?: SortOrder
    prodLote?: SortOrder
    prodCurso?: SortOrder
    prodTurma?: SortOrder
    _count?: ProdutoCountOrderByAggregateInput
    _avg?: ProdutoAvgOrderByAggregateInput
    _max?: ProdutoMaxOrderByAggregateInput
    _min?: ProdutoMinOrderByAggregateInput
    _sum?: ProdutoSumOrderByAggregateInput
  }

  export type ProdutoScalarWhereWithAggregatesInput = {
    AND?: ProdutoScalarWhereWithAggregatesInput | ProdutoScalarWhereWithAggregatesInput[]
    OR?: ProdutoScalarWhereWithAggregatesInput[]
    NOT?: ProdutoScalarWhereWithAggregatesInput | ProdutoScalarWhereWithAggregatesInput[]
    idProduto?: IntWithAggregatesFilter<"Produto"> | number
    uuid?: StringWithAggregatesFilter<"Produto"> | string
    prodDescricao?: StringWithAggregatesFilter<"Produto"> | string
    prodFabricante?: StringWithAggregatesFilter<"Produto"> | string
    prodQuantidade?: IntWithAggregatesFilter<"Produto"> | number
    prodValidade?: DateTimeWithAggregatesFilter<"Produto"> | Date | string
    prodLote?: StringWithAggregatesFilter<"Produto"> | string
    prodCurso?: IntWithAggregatesFilter<"Produto"> | number
    prodTurma?: IntWithAggregatesFilter<"Produto"> | number
  }

  export type OperacaoWhereInput = {
    AND?: OperacaoWhereInput | OperacaoWhereInput[]
    OR?: OperacaoWhereInput[]
    NOT?: OperacaoWhereInput | OperacaoWhereInput[]
    idOperacao?: IntFilter<"Operacao"> | number
    tipoOperacao?: IntFilter<"Operacao"> | number
    idUsuario?: IntFilter<"Operacao"> | number
    idProduto?: IntFilter<"Operacao"> | number
    data?: DateTimeFilter<"Operacao"> | Date | string
    quantidade?: IntFilter<"Operacao"> | number
    usuario?: XOR<UserScalarRelationFilter, UserWhereInput>
    produto?: XOR<ProdutoScalarRelationFilter, ProdutoWhereInput>
  }

  export type OperacaoOrderByWithRelationInput = {
    idOperacao?: SortOrder
    tipoOperacao?: SortOrder
    idUsuario?: SortOrder
    idProduto?: SortOrder
    data?: SortOrder
    quantidade?: SortOrder
    usuario?: UserOrderByWithRelationInput
    produto?: ProdutoOrderByWithRelationInput
  }

  export type OperacaoWhereUniqueInput = Prisma.AtLeast<{
    idOperacao?: number
    AND?: OperacaoWhereInput | OperacaoWhereInput[]
    OR?: OperacaoWhereInput[]
    NOT?: OperacaoWhereInput | OperacaoWhereInput[]
    tipoOperacao?: IntFilter<"Operacao"> | number
    idUsuario?: IntFilter<"Operacao"> | number
    idProduto?: IntFilter<"Operacao"> | number
    data?: DateTimeFilter<"Operacao"> | Date | string
    quantidade?: IntFilter<"Operacao"> | number
    usuario?: XOR<UserScalarRelationFilter, UserWhereInput>
    produto?: XOR<ProdutoScalarRelationFilter, ProdutoWhereInput>
  }, "idOperacao">

  export type OperacaoOrderByWithAggregationInput = {
    idOperacao?: SortOrder
    tipoOperacao?: SortOrder
    idUsuario?: SortOrder
    idProduto?: SortOrder
    data?: SortOrder
    quantidade?: SortOrder
    _count?: OperacaoCountOrderByAggregateInput
    _avg?: OperacaoAvgOrderByAggregateInput
    _max?: OperacaoMaxOrderByAggregateInput
    _min?: OperacaoMinOrderByAggregateInput
    _sum?: OperacaoSumOrderByAggregateInput
  }

  export type OperacaoScalarWhereWithAggregatesInput = {
    AND?: OperacaoScalarWhereWithAggregatesInput | OperacaoScalarWhereWithAggregatesInput[]
    OR?: OperacaoScalarWhereWithAggregatesInput[]
    NOT?: OperacaoScalarWhereWithAggregatesInput | OperacaoScalarWhereWithAggregatesInput[]
    idOperacao?: IntWithAggregatesFilter<"Operacao"> | number
    tipoOperacao?: IntWithAggregatesFilter<"Operacao"> | number
    idUsuario?: IntWithAggregatesFilter<"Operacao"> | number
    idProduto?: IntWithAggregatesFilter<"Operacao"> | number
    data?: DateTimeWithAggregatesFilter<"Operacao"> | Date | string
    quantidade?: IntWithAggregatesFilter<"Operacao"> | number
  }

  export type CursoCreateInput = {
    nomeCurso: string
    status?: boolean
    turmas?: TurmaCreateNestedManyWithoutCursoInput
    produtos?: ProdutoCreateNestedManyWithoutCursoInput
    users?: UserCreateNestedManyWithoutCursoInput
  }

  export type CursoUncheckedCreateInput = {
    idCurso?: number
    nomeCurso: string
    status?: boolean
    turmas?: TurmaUncheckedCreateNestedManyWithoutCursoInput
    produtos?: ProdutoUncheckedCreateNestedManyWithoutCursoInput
    users?: UserUncheckedCreateNestedManyWithoutCursoInput
  }

  export type CursoUpdateInput = {
    nomeCurso?: StringFieldUpdateOperationsInput | string
    status?: BoolFieldUpdateOperationsInput | boolean
    turmas?: TurmaUpdateManyWithoutCursoNestedInput
    produtos?: ProdutoUpdateManyWithoutCursoNestedInput
    users?: UserUpdateManyWithoutCursoNestedInput
  }

  export type CursoUncheckedUpdateInput = {
    idCurso?: IntFieldUpdateOperationsInput | number
    nomeCurso?: StringFieldUpdateOperationsInput | string
    status?: BoolFieldUpdateOperationsInput | boolean
    turmas?: TurmaUncheckedUpdateManyWithoutCursoNestedInput
    produtos?: ProdutoUncheckedUpdateManyWithoutCursoNestedInput
    users?: UserUncheckedUpdateManyWithoutCursoNestedInput
  }

  export type CursoCreateManyInput = {
    idCurso?: number
    nomeCurso: string
    status?: boolean
  }

  export type CursoUpdateManyMutationInput = {
    nomeCurso?: StringFieldUpdateOperationsInput | string
    status?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CursoUncheckedUpdateManyInput = {
    idCurso?: IntFieldUpdateOperationsInput | number
    nomeCurso?: StringFieldUpdateOperationsInput | string
    status?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserCreateInput = {
    nome: string
    email: string
    password: string
    role?: $Enums.Role
    status?: boolean
    created_by: number
    created_at?: Date | string
    updated_at?: Date | string
    curso?: CursoCreateNestedOneWithoutUsersInput
    operacoes?: OperacaoCreateNestedManyWithoutUsuarioInput
  }

  export type UserUncheckedCreateInput = {
    idUser?: number
    nome: string
    email: string
    password: string
    role?: $Enums.Role
    idCurso?: number | null
    status?: boolean
    created_by: number
    created_at?: Date | string
    updated_at?: Date | string
    operacoes?: OperacaoUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UserUpdateInput = {
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: BoolFieldUpdateOperationsInput | boolean
    created_by?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    curso?: CursoUpdateOneWithoutUsersNestedInput
    operacoes?: OperacaoUpdateManyWithoutUsuarioNestedInput
  }

  export type UserUncheckedUpdateInput = {
    idUser?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    idCurso?: NullableIntFieldUpdateOperationsInput | number | null
    status?: BoolFieldUpdateOperationsInput | boolean
    created_by?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    operacoes?: OperacaoUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type UserCreateManyInput = {
    idUser?: number
    nome: string
    email: string
    password: string
    role?: $Enums.Role
    idCurso?: number | null
    status?: boolean
    created_by: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: BoolFieldUpdateOperationsInput | boolean
    created_by?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    idUser?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    idCurso?: NullableIntFieldUpdateOperationsInput | number | null
    status?: BoolFieldUpdateOperationsInput | boolean
    created_by?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TurmaCreateInput = {
    uuid?: string
    codigoTurma: string
    turnoTurma: string
    status: boolean
    curso: CursoCreateNestedOneWithoutTurmasInput
    produtos?: ProdutoCreateNestedManyWithoutTurmaInput
  }

  export type TurmaUncheckedCreateInput = {
    idTurma?: number
    uuid?: string
    codigoTurma: string
    turnoTurma: string
    idCurso: number
    status: boolean
    produtos?: ProdutoUncheckedCreateNestedManyWithoutTurmaInput
  }

  export type TurmaUpdateInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    codigoTurma?: StringFieldUpdateOperationsInput | string
    turnoTurma?: StringFieldUpdateOperationsInput | string
    status?: BoolFieldUpdateOperationsInput | boolean
    curso?: CursoUpdateOneRequiredWithoutTurmasNestedInput
    produtos?: ProdutoUpdateManyWithoutTurmaNestedInput
  }

  export type TurmaUncheckedUpdateInput = {
    idTurma?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    codigoTurma?: StringFieldUpdateOperationsInput | string
    turnoTurma?: StringFieldUpdateOperationsInput | string
    idCurso?: IntFieldUpdateOperationsInput | number
    status?: BoolFieldUpdateOperationsInput | boolean
    produtos?: ProdutoUncheckedUpdateManyWithoutTurmaNestedInput
  }

  export type TurmaCreateManyInput = {
    idTurma?: number
    uuid?: string
    codigoTurma: string
    turnoTurma: string
    idCurso: number
    status: boolean
  }

  export type TurmaUpdateManyMutationInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    codigoTurma?: StringFieldUpdateOperationsInput | string
    turnoTurma?: StringFieldUpdateOperationsInput | string
    status?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TurmaUncheckedUpdateManyInput = {
    idTurma?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    codigoTurma?: StringFieldUpdateOperationsInput | string
    turnoTurma?: StringFieldUpdateOperationsInput | string
    idCurso?: IntFieldUpdateOperationsInput | number
    status?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProdutoCreateInput = {
    uuid?: string
    prodDescricao: string
    prodFabricante: string
    prodQuantidade: number
    prodValidade: Date | string
    prodLote: string
    curso: CursoCreateNestedOneWithoutProdutosInput
    turma: TurmaCreateNestedOneWithoutProdutosInput
    operacoes?: OperacaoCreateNestedManyWithoutProdutoInput
  }

  export type ProdutoUncheckedCreateInput = {
    idProduto?: number
    uuid?: string
    prodDescricao: string
    prodFabricante: string
    prodQuantidade: number
    prodValidade: Date | string
    prodLote: string
    prodCurso: number
    prodTurma: number
    operacoes?: OperacaoUncheckedCreateNestedManyWithoutProdutoInput
  }

  export type ProdutoUpdateInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    prodDescricao?: StringFieldUpdateOperationsInput | string
    prodFabricante?: StringFieldUpdateOperationsInput | string
    prodQuantidade?: IntFieldUpdateOperationsInput | number
    prodValidade?: DateTimeFieldUpdateOperationsInput | Date | string
    prodLote?: StringFieldUpdateOperationsInput | string
    curso?: CursoUpdateOneRequiredWithoutProdutosNestedInput
    turma?: TurmaUpdateOneRequiredWithoutProdutosNestedInput
    operacoes?: OperacaoUpdateManyWithoutProdutoNestedInput
  }

  export type ProdutoUncheckedUpdateInput = {
    idProduto?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    prodDescricao?: StringFieldUpdateOperationsInput | string
    prodFabricante?: StringFieldUpdateOperationsInput | string
    prodQuantidade?: IntFieldUpdateOperationsInput | number
    prodValidade?: DateTimeFieldUpdateOperationsInput | Date | string
    prodLote?: StringFieldUpdateOperationsInput | string
    prodCurso?: IntFieldUpdateOperationsInput | number
    prodTurma?: IntFieldUpdateOperationsInput | number
    operacoes?: OperacaoUncheckedUpdateManyWithoutProdutoNestedInput
  }

  export type ProdutoCreateManyInput = {
    idProduto?: number
    uuid?: string
    prodDescricao: string
    prodFabricante: string
    prodQuantidade: number
    prodValidade: Date | string
    prodLote: string
    prodCurso: number
    prodTurma: number
  }

  export type ProdutoUpdateManyMutationInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    prodDescricao?: StringFieldUpdateOperationsInput | string
    prodFabricante?: StringFieldUpdateOperationsInput | string
    prodQuantidade?: IntFieldUpdateOperationsInput | number
    prodValidade?: DateTimeFieldUpdateOperationsInput | Date | string
    prodLote?: StringFieldUpdateOperationsInput | string
  }

  export type ProdutoUncheckedUpdateManyInput = {
    idProduto?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    prodDescricao?: StringFieldUpdateOperationsInput | string
    prodFabricante?: StringFieldUpdateOperationsInput | string
    prodQuantidade?: IntFieldUpdateOperationsInput | number
    prodValidade?: DateTimeFieldUpdateOperationsInput | Date | string
    prodLote?: StringFieldUpdateOperationsInput | string
    prodCurso?: IntFieldUpdateOperationsInput | number
    prodTurma?: IntFieldUpdateOperationsInput | number
  }

  export type OperacaoCreateInput = {
    tipoOperacao: number
    data: Date | string
    quantidade: number
    usuario: UserCreateNestedOneWithoutOperacoesInput
    produto: ProdutoCreateNestedOneWithoutOperacoesInput
  }

  export type OperacaoUncheckedCreateInput = {
    idOperacao?: number
    tipoOperacao: number
    idUsuario: number
    idProduto: number
    data: Date | string
    quantidade: number
  }

  export type OperacaoUpdateInput = {
    tipoOperacao?: IntFieldUpdateOperationsInput | number
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    quantidade?: IntFieldUpdateOperationsInput | number
    usuario?: UserUpdateOneRequiredWithoutOperacoesNestedInput
    produto?: ProdutoUpdateOneRequiredWithoutOperacoesNestedInput
  }

  export type OperacaoUncheckedUpdateInput = {
    idOperacao?: IntFieldUpdateOperationsInput | number
    tipoOperacao?: IntFieldUpdateOperationsInput | number
    idUsuario?: IntFieldUpdateOperationsInput | number
    idProduto?: IntFieldUpdateOperationsInput | number
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    quantidade?: IntFieldUpdateOperationsInput | number
  }

  export type OperacaoCreateManyInput = {
    idOperacao?: number
    tipoOperacao: number
    idUsuario: number
    idProduto: number
    data: Date | string
    quantidade: number
  }

  export type OperacaoUpdateManyMutationInput = {
    tipoOperacao?: IntFieldUpdateOperationsInput | number
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    quantidade?: IntFieldUpdateOperationsInput | number
  }

  export type OperacaoUncheckedUpdateManyInput = {
    idOperacao?: IntFieldUpdateOperationsInput | number
    tipoOperacao?: IntFieldUpdateOperationsInput | number
    idUsuario?: IntFieldUpdateOperationsInput | number
    idProduto?: IntFieldUpdateOperationsInput | number
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    quantidade?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type TurmaListRelationFilter = {
    every?: TurmaWhereInput
    some?: TurmaWhereInput
    none?: TurmaWhereInput
  }

  export type ProdutoListRelationFilter = {
    every?: ProdutoWhereInput
    some?: ProdutoWhereInput
    none?: ProdutoWhereInput
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type TurmaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProdutoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CursoCountOrderByAggregateInput = {
    idCurso?: SortOrder
    nomeCurso?: SortOrder
    status?: SortOrder
  }

  export type CursoAvgOrderByAggregateInput = {
    idCurso?: SortOrder
  }

  export type CursoMaxOrderByAggregateInput = {
    idCurso?: SortOrder
    nomeCurso?: SortOrder
    status?: SortOrder
  }

  export type CursoMinOrderByAggregateInput = {
    idCurso?: SortOrder
    nomeCurso?: SortOrder
    status?: SortOrder
  }

  export type CursoSumOrderByAggregateInput = {
    idCurso?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type CursoNullableScalarRelationFilter = {
    is?: CursoWhereInput | null
    isNot?: CursoWhereInput | null
  }

  export type OperacaoListRelationFilter = {
    every?: OperacaoWhereInput
    some?: OperacaoWhereInput
    none?: OperacaoWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type OperacaoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    idUser?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    idCurso?: SortOrder
    status?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    idUser?: SortOrder
    idCurso?: SortOrder
    created_by?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    idUser?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    idCurso?: SortOrder
    status?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    idUser?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    idCurso?: SortOrder
    status?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    idUser?: SortOrder
    idCurso?: SortOrder
    created_by?: SortOrder
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type CursoScalarRelationFilter = {
    is?: CursoWhereInput
    isNot?: CursoWhereInput
  }

  export type TurmaCountOrderByAggregateInput = {
    idTurma?: SortOrder
    uuid?: SortOrder
    codigoTurma?: SortOrder
    turnoTurma?: SortOrder
    idCurso?: SortOrder
    status?: SortOrder
  }

  export type TurmaAvgOrderByAggregateInput = {
    idTurma?: SortOrder
    idCurso?: SortOrder
  }

  export type TurmaMaxOrderByAggregateInput = {
    idTurma?: SortOrder
    uuid?: SortOrder
    codigoTurma?: SortOrder
    turnoTurma?: SortOrder
    idCurso?: SortOrder
    status?: SortOrder
  }

  export type TurmaMinOrderByAggregateInput = {
    idTurma?: SortOrder
    uuid?: SortOrder
    codigoTurma?: SortOrder
    turnoTurma?: SortOrder
    idCurso?: SortOrder
    status?: SortOrder
  }

  export type TurmaSumOrderByAggregateInput = {
    idTurma?: SortOrder
    idCurso?: SortOrder
  }

  export type TurmaScalarRelationFilter = {
    is?: TurmaWhereInput
    isNot?: TurmaWhereInput
  }

  export type ProdutoCountOrderByAggregateInput = {
    idProduto?: SortOrder
    uuid?: SortOrder
    prodDescricao?: SortOrder
    prodFabricante?: SortOrder
    prodQuantidade?: SortOrder
    prodValidade?: SortOrder
    prodLote?: SortOrder
    prodCurso?: SortOrder
    prodTurma?: SortOrder
  }

  export type ProdutoAvgOrderByAggregateInput = {
    idProduto?: SortOrder
    prodQuantidade?: SortOrder
    prodCurso?: SortOrder
    prodTurma?: SortOrder
  }

  export type ProdutoMaxOrderByAggregateInput = {
    idProduto?: SortOrder
    uuid?: SortOrder
    prodDescricao?: SortOrder
    prodFabricante?: SortOrder
    prodQuantidade?: SortOrder
    prodValidade?: SortOrder
    prodLote?: SortOrder
    prodCurso?: SortOrder
    prodTurma?: SortOrder
  }

  export type ProdutoMinOrderByAggregateInput = {
    idProduto?: SortOrder
    uuid?: SortOrder
    prodDescricao?: SortOrder
    prodFabricante?: SortOrder
    prodQuantidade?: SortOrder
    prodValidade?: SortOrder
    prodLote?: SortOrder
    prodCurso?: SortOrder
    prodTurma?: SortOrder
  }

  export type ProdutoSumOrderByAggregateInput = {
    idProduto?: SortOrder
    prodQuantidade?: SortOrder
    prodCurso?: SortOrder
    prodTurma?: SortOrder
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ProdutoScalarRelationFilter = {
    is?: ProdutoWhereInput
    isNot?: ProdutoWhereInput
  }

  export type OperacaoCountOrderByAggregateInput = {
    idOperacao?: SortOrder
    tipoOperacao?: SortOrder
    idUsuario?: SortOrder
    idProduto?: SortOrder
    data?: SortOrder
    quantidade?: SortOrder
  }

  export type OperacaoAvgOrderByAggregateInput = {
    idOperacao?: SortOrder
    tipoOperacao?: SortOrder
    idUsuario?: SortOrder
    idProduto?: SortOrder
    quantidade?: SortOrder
  }

  export type OperacaoMaxOrderByAggregateInput = {
    idOperacao?: SortOrder
    tipoOperacao?: SortOrder
    idUsuario?: SortOrder
    idProduto?: SortOrder
    data?: SortOrder
    quantidade?: SortOrder
  }

  export type OperacaoMinOrderByAggregateInput = {
    idOperacao?: SortOrder
    tipoOperacao?: SortOrder
    idUsuario?: SortOrder
    idProduto?: SortOrder
    data?: SortOrder
    quantidade?: SortOrder
  }

  export type OperacaoSumOrderByAggregateInput = {
    idOperacao?: SortOrder
    tipoOperacao?: SortOrder
    idUsuario?: SortOrder
    idProduto?: SortOrder
    quantidade?: SortOrder
  }

  export type TurmaCreateNestedManyWithoutCursoInput = {
    create?: XOR<TurmaCreateWithoutCursoInput, TurmaUncheckedCreateWithoutCursoInput> | TurmaCreateWithoutCursoInput[] | TurmaUncheckedCreateWithoutCursoInput[]
    connectOrCreate?: TurmaCreateOrConnectWithoutCursoInput | TurmaCreateOrConnectWithoutCursoInput[]
    createMany?: TurmaCreateManyCursoInputEnvelope
    connect?: TurmaWhereUniqueInput | TurmaWhereUniqueInput[]
  }

  export type ProdutoCreateNestedManyWithoutCursoInput = {
    create?: XOR<ProdutoCreateWithoutCursoInput, ProdutoUncheckedCreateWithoutCursoInput> | ProdutoCreateWithoutCursoInput[] | ProdutoUncheckedCreateWithoutCursoInput[]
    connectOrCreate?: ProdutoCreateOrConnectWithoutCursoInput | ProdutoCreateOrConnectWithoutCursoInput[]
    createMany?: ProdutoCreateManyCursoInputEnvelope
    connect?: ProdutoWhereUniqueInput | ProdutoWhereUniqueInput[]
  }

  export type UserCreateNestedManyWithoutCursoInput = {
    create?: XOR<UserCreateWithoutCursoInput, UserUncheckedCreateWithoutCursoInput> | UserCreateWithoutCursoInput[] | UserUncheckedCreateWithoutCursoInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCursoInput | UserCreateOrConnectWithoutCursoInput[]
    createMany?: UserCreateManyCursoInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type TurmaUncheckedCreateNestedManyWithoutCursoInput = {
    create?: XOR<TurmaCreateWithoutCursoInput, TurmaUncheckedCreateWithoutCursoInput> | TurmaCreateWithoutCursoInput[] | TurmaUncheckedCreateWithoutCursoInput[]
    connectOrCreate?: TurmaCreateOrConnectWithoutCursoInput | TurmaCreateOrConnectWithoutCursoInput[]
    createMany?: TurmaCreateManyCursoInputEnvelope
    connect?: TurmaWhereUniqueInput | TurmaWhereUniqueInput[]
  }

  export type ProdutoUncheckedCreateNestedManyWithoutCursoInput = {
    create?: XOR<ProdutoCreateWithoutCursoInput, ProdutoUncheckedCreateWithoutCursoInput> | ProdutoCreateWithoutCursoInput[] | ProdutoUncheckedCreateWithoutCursoInput[]
    connectOrCreate?: ProdutoCreateOrConnectWithoutCursoInput | ProdutoCreateOrConnectWithoutCursoInput[]
    createMany?: ProdutoCreateManyCursoInputEnvelope
    connect?: ProdutoWhereUniqueInput | ProdutoWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutCursoInput = {
    create?: XOR<UserCreateWithoutCursoInput, UserUncheckedCreateWithoutCursoInput> | UserCreateWithoutCursoInput[] | UserUncheckedCreateWithoutCursoInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCursoInput | UserCreateOrConnectWithoutCursoInput[]
    createMany?: UserCreateManyCursoInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type TurmaUpdateManyWithoutCursoNestedInput = {
    create?: XOR<TurmaCreateWithoutCursoInput, TurmaUncheckedCreateWithoutCursoInput> | TurmaCreateWithoutCursoInput[] | TurmaUncheckedCreateWithoutCursoInput[]
    connectOrCreate?: TurmaCreateOrConnectWithoutCursoInput | TurmaCreateOrConnectWithoutCursoInput[]
    upsert?: TurmaUpsertWithWhereUniqueWithoutCursoInput | TurmaUpsertWithWhereUniqueWithoutCursoInput[]
    createMany?: TurmaCreateManyCursoInputEnvelope
    set?: TurmaWhereUniqueInput | TurmaWhereUniqueInput[]
    disconnect?: TurmaWhereUniqueInput | TurmaWhereUniqueInput[]
    delete?: TurmaWhereUniqueInput | TurmaWhereUniqueInput[]
    connect?: TurmaWhereUniqueInput | TurmaWhereUniqueInput[]
    update?: TurmaUpdateWithWhereUniqueWithoutCursoInput | TurmaUpdateWithWhereUniqueWithoutCursoInput[]
    updateMany?: TurmaUpdateManyWithWhereWithoutCursoInput | TurmaUpdateManyWithWhereWithoutCursoInput[]
    deleteMany?: TurmaScalarWhereInput | TurmaScalarWhereInput[]
  }

  export type ProdutoUpdateManyWithoutCursoNestedInput = {
    create?: XOR<ProdutoCreateWithoutCursoInput, ProdutoUncheckedCreateWithoutCursoInput> | ProdutoCreateWithoutCursoInput[] | ProdutoUncheckedCreateWithoutCursoInput[]
    connectOrCreate?: ProdutoCreateOrConnectWithoutCursoInput | ProdutoCreateOrConnectWithoutCursoInput[]
    upsert?: ProdutoUpsertWithWhereUniqueWithoutCursoInput | ProdutoUpsertWithWhereUniqueWithoutCursoInput[]
    createMany?: ProdutoCreateManyCursoInputEnvelope
    set?: ProdutoWhereUniqueInput | ProdutoWhereUniqueInput[]
    disconnect?: ProdutoWhereUniqueInput | ProdutoWhereUniqueInput[]
    delete?: ProdutoWhereUniqueInput | ProdutoWhereUniqueInput[]
    connect?: ProdutoWhereUniqueInput | ProdutoWhereUniqueInput[]
    update?: ProdutoUpdateWithWhereUniqueWithoutCursoInput | ProdutoUpdateWithWhereUniqueWithoutCursoInput[]
    updateMany?: ProdutoUpdateManyWithWhereWithoutCursoInput | ProdutoUpdateManyWithWhereWithoutCursoInput[]
    deleteMany?: ProdutoScalarWhereInput | ProdutoScalarWhereInput[]
  }

  export type UserUpdateManyWithoutCursoNestedInput = {
    create?: XOR<UserCreateWithoutCursoInput, UserUncheckedCreateWithoutCursoInput> | UserCreateWithoutCursoInput[] | UserUncheckedCreateWithoutCursoInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCursoInput | UserCreateOrConnectWithoutCursoInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutCursoInput | UserUpsertWithWhereUniqueWithoutCursoInput[]
    createMany?: UserCreateManyCursoInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutCursoInput | UserUpdateWithWhereUniqueWithoutCursoInput[]
    updateMany?: UserUpdateManyWithWhereWithoutCursoInput | UserUpdateManyWithWhereWithoutCursoInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TurmaUncheckedUpdateManyWithoutCursoNestedInput = {
    create?: XOR<TurmaCreateWithoutCursoInput, TurmaUncheckedCreateWithoutCursoInput> | TurmaCreateWithoutCursoInput[] | TurmaUncheckedCreateWithoutCursoInput[]
    connectOrCreate?: TurmaCreateOrConnectWithoutCursoInput | TurmaCreateOrConnectWithoutCursoInput[]
    upsert?: TurmaUpsertWithWhereUniqueWithoutCursoInput | TurmaUpsertWithWhereUniqueWithoutCursoInput[]
    createMany?: TurmaCreateManyCursoInputEnvelope
    set?: TurmaWhereUniqueInput | TurmaWhereUniqueInput[]
    disconnect?: TurmaWhereUniqueInput | TurmaWhereUniqueInput[]
    delete?: TurmaWhereUniqueInput | TurmaWhereUniqueInput[]
    connect?: TurmaWhereUniqueInput | TurmaWhereUniqueInput[]
    update?: TurmaUpdateWithWhereUniqueWithoutCursoInput | TurmaUpdateWithWhereUniqueWithoutCursoInput[]
    updateMany?: TurmaUpdateManyWithWhereWithoutCursoInput | TurmaUpdateManyWithWhereWithoutCursoInput[]
    deleteMany?: TurmaScalarWhereInput | TurmaScalarWhereInput[]
  }

  export type ProdutoUncheckedUpdateManyWithoutCursoNestedInput = {
    create?: XOR<ProdutoCreateWithoutCursoInput, ProdutoUncheckedCreateWithoutCursoInput> | ProdutoCreateWithoutCursoInput[] | ProdutoUncheckedCreateWithoutCursoInput[]
    connectOrCreate?: ProdutoCreateOrConnectWithoutCursoInput | ProdutoCreateOrConnectWithoutCursoInput[]
    upsert?: ProdutoUpsertWithWhereUniqueWithoutCursoInput | ProdutoUpsertWithWhereUniqueWithoutCursoInput[]
    createMany?: ProdutoCreateManyCursoInputEnvelope
    set?: ProdutoWhereUniqueInput | ProdutoWhereUniqueInput[]
    disconnect?: ProdutoWhereUniqueInput | ProdutoWhereUniqueInput[]
    delete?: ProdutoWhereUniqueInput | ProdutoWhereUniqueInput[]
    connect?: ProdutoWhereUniqueInput | ProdutoWhereUniqueInput[]
    update?: ProdutoUpdateWithWhereUniqueWithoutCursoInput | ProdutoUpdateWithWhereUniqueWithoutCursoInput[]
    updateMany?: ProdutoUpdateManyWithWhereWithoutCursoInput | ProdutoUpdateManyWithWhereWithoutCursoInput[]
    deleteMany?: ProdutoScalarWhereInput | ProdutoScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutCursoNestedInput = {
    create?: XOR<UserCreateWithoutCursoInput, UserUncheckedCreateWithoutCursoInput> | UserCreateWithoutCursoInput[] | UserUncheckedCreateWithoutCursoInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCursoInput | UserCreateOrConnectWithoutCursoInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutCursoInput | UserUpsertWithWhereUniqueWithoutCursoInput[]
    createMany?: UserCreateManyCursoInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutCursoInput | UserUpdateWithWhereUniqueWithoutCursoInput[]
    updateMany?: UserUpdateManyWithWhereWithoutCursoInput | UserUpdateManyWithWhereWithoutCursoInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type CursoCreateNestedOneWithoutUsersInput = {
    create?: XOR<CursoCreateWithoutUsersInput, CursoUncheckedCreateWithoutUsersInput>
    connectOrCreate?: CursoCreateOrConnectWithoutUsersInput
    connect?: CursoWhereUniqueInput
  }

  export type OperacaoCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<OperacaoCreateWithoutUsuarioInput, OperacaoUncheckedCreateWithoutUsuarioInput> | OperacaoCreateWithoutUsuarioInput[] | OperacaoUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: OperacaoCreateOrConnectWithoutUsuarioInput | OperacaoCreateOrConnectWithoutUsuarioInput[]
    createMany?: OperacaoCreateManyUsuarioInputEnvelope
    connect?: OperacaoWhereUniqueInput | OperacaoWhereUniqueInput[]
  }

  export type OperacaoUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<OperacaoCreateWithoutUsuarioInput, OperacaoUncheckedCreateWithoutUsuarioInput> | OperacaoCreateWithoutUsuarioInput[] | OperacaoUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: OperacaoCreateOrConnectWithoutUsuarioInput | OperacaoCreateOrConnectWithoutUsuarioInput[]
    createMany?: OperacaoCreateManyUsuarioInputEnvelope
    connect?: OperacaoWhereUniqueInput | OperacaoWhereUniqueInput[]
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CursoUpdateOneWithoutUsersNestedInput = {
    create?: XOR<CursoCreateWithoutUsersInput, CursoUncheckedCreateWithoutUsersInput>
    connectOrCreate?: CursoCreateOrConnectWithoutUsersInput
    upsert?: CursoUpsertWithoutUsersInput
    disconnect?: CursoWhereInput | boolean
    delete?: CursoWhereInput | boolean
    connect?: CursoWhereUniqueInput
    update?: XOR<XOR<CursoUpdateToOneWithWhereWithoutUsersInput, CursoUpdateWithoutUsersInput>, CursoUncheckedUpdateWithoutUsersInput>
  }

  export type OperacaoUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<OperacaoCreateWithoutUsuarioInput, OperacaoUncheckedCreateWithoutUsuarioInput> | OperacaoCreateWithoutUsuarioInput[] | OperacaoUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: OperacaoCreateOrConnectWithoutUsuarioInput | OperacaoCreateOrConnectWithoutUsuarioInput[]
    upsert?: OperacaoUpsertWithWhereUniqueWithoutUsuarioInput | OperacaoUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: OperacaoCreateManyUsuarioInputEnvelope
    set?: OperacaoWhereUniqueInput | OperacaoWhereUniqueInput[]
    disconnect?: OperacaoWhereUniqueInput | OperacaoWhereUniqueInput[]
    delete?: OperacaoWhereUniqueInput | OperacaoWhereUniqueInput[]
    connect?: OperacaoWhereUniqueInput | OperacaoWhereUniqueInput[]
    update?: OperacaoUpdateWithWhereUniqueWithoutUsuarioInput | OperacaoUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: OperacaoUpdateManyWithWhereWithoutUsuarioInput | OperacaoUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: OperacaoScalarWhereInput | OperacaoScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type OperacaoUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<OperacaoCreateWithoutUsuarioInput, OperacaoUncheckedCreateWithoutUsuarioInput> | OperacaoCreateWithoutUsuarioInput[] | OperacaoUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: OperacaoCreateOrConnectWithoutUsuarioInput | OperacaoCreateOrConnectWithoutUsuarioInput[]
    upsert?: OperacaoUpsertWithWhereUniqueWithoutUsuarioInput | OperacaoUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: OperacaoCreateManyUsuarioInputEnvelope
    set?: OperacaoWhereUniqueInput | OperacaoWhereUniqueInput[]
    disconnect?: OperacaoWhereUniqueInput | OperacaoWhereUniqueInput[]
    delete?: OperacaoWhereUniqueInput | OperacaoWhereUniqueInput[]
    connect?: OperacaoWhereUniqueInput | OperacaoWhereUniqueInput[]
    update?: OperacaoUpdateWithWhereUniqueWithoutUsuarioInput | OperacaoUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: OperacaoUpdateManyWithWhereWithoutUsuarioInput | OperacaoUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: OperacaoScalarWhereInput | OperacaoScalarWhereInput[]
  }

  export type CursoCreateNestedOneWithoutTurmasInput = {
    create?: XOR<CursoCreateWithoutTurmasInput, CursoUncheckedCreateWithoutTurmasInput>
    connectOrCreate?: CursoCreateOrConnectWithoutTurmasInput
    connect?: CursoWhereUniqueInput
  }

  export type ProdutoCreateNestedManyWithoutTurmaInput = {
    create?: XOR<ProdutoCreateWithoutTurmaInput, ProdutoUncheckedCreateWithoutTurmaInput> | ProdutoCreateWithoutTurmaInput[] | ProdutoUncheckedCreateWithoutTurmaInput[]
    connectOrCreate?: ProdutoCreateOrConnectWithoutTurmaInput | ProdutoCreateOrConnectWithoutTurmaInput[]
    createMany?: ProdutoCreateManyTurmaInputEnvelope
    connect?: ProdutoWhereUniqueInput | ProdutoWhereUniqueInput[]
  }

  export type ProdutoUncheckedCreateNestedManyWithoutTurmaInput = {
    create?: XOR<ProdutoCreateWithoutTurmaInput, ProdutoUncheckedCreateWithoutTurmaInput> | ProdutoCreateWithoutTurmaInput[] | ProdutoUncheckedCreateWithoutTurmaInput[]
    connectOrCreate?: ProdutoCreateOrConnectWithoutTurmaInput | ProdutoCreateOrConnectWithoutTurmaInput[]
    createMany?: ProdutoCreateManyTurmaInputEnvelope
    connect?: ProdutoWhereUniqueInput | ProdutoWhereUniqueInput[]
  }

  export type CursoUpdateOneRequiredWithoutTurmasNestedInput = {
    create?: XOR<CursoCreateWithoutTurmasInput, CursoUncheckedCreateWithoutTurmasInput>
    connectOrCreate?: CursoCreateOrConnectWithoutTurmasInput
    upsert?: CursoUpsertWithoutTurmasInput
    connect?: CursoWhereUniqueInput
    update?: XOR<XOR<CursoUpdateToOneWithWhereWithoutTurmasInput, CursoUpdateWithoutTurmasInput>, CursoUncheckedUpdateWithoutTurmasInput>
  }

  export type ProdutoUpdateManyWithoutTurmaNestedInput = {
    create?: XOR<ProdutoCreateWithoutTurmaInput, ProdutoUncheckedCreateWithoutTurmaInput> | ProdutoCreateWithoutTurmaInput[] | ProdutoUncheckedCreateWithoutTurmaInput[]
    connectOrCreate?: ProdutoCreateOrConnectWithoutTurmaInput | ProdutoCreateOrConnectWithoutTurmaInput[]
    upsert?: ProdutoUpsertWithWhereUniqueWithoutTurmaInput | ProdutoUpsertWithWhereUniqueWithoutTurmaInput[]
    createMany?: ProdutoCreateManyTurmaInputEnvelope
    set?: ProdutoWhereUniqueInput | ProdutoWhereUniqueInput[]
    disconnect?: ProdutoWhereUniqueInput | ProdutoWhereUniqueInput[]
    delete?: ProdutoWhereUniqueInput | ProdutoWhereUniqueInput[]
    connect?: ProdutoWhereUniqueInput | ProdutoWhereUniqueInput[]
    update?: ProdutoUpdateWithWhereUniqueWithoutTurmaInput | ProdutoUpdateWithWhereUniqueWithoutTurmaInput[]
    updateMany?: ProdutoUpdateManyWithWhereWithoutTurmaInput | ProdutoUpdateManyWithWhereWithoutTurmaInput[]
    deleteMany?: ProdutoScalarWhereInput | ProdutoScalarWhereInput[]
  }

  export type ProdutoUncheckedUpdateManyWithoutTurmaNestedInput = {
    create?: XOR<ProdutoCreateWithoutTurmaInput, ProdutoUncheckedCreateWithoutTurmaInput> | ProdutoCreateWithoutTurmaInput[] | ProdutoUncheckedCreateWithoutTurmaInput[]
    connectOrCreate?: ProdutoCreateOrConnectWithoutTurmaInput | ProdutoCreateOrConnectWithoutTurmaInput[]
    upsert?: ProdutoUpsertWithWhereUniqueWithoutTurmaInput | ProdutoUpsertWithWhereUniqueWithoutTurmaInput[]
    createMany?: ProdutoCreateManyTurmaInputEnvelope
    set?: ProdutoWhereUniqueInput | ProdutoWhereUniqueInput[]
    disconnect?: ProdutoWhereUniqueInput | ProdutoWhereUniqueInput[]
    delete?: ProdutoWhereUniqueInput | ProdutoWhereUniqueInput[]
    connect?: ProdutoWhereUniqueInput | ProdutoWhereUniqueInput[]
    update?: ProdutoUpdateWithWhereUniqueWithoutTurmaInput | ProdutoUpdateWithWhereUniqueWithoutTurmaInput[]
    updateMany?: ProdutoUpdateManyWithWhereWithoutTurmaInput | ProdutoUpdateManyWithWhereWithoutTurmaInput[]
    deleteMany?: ProdutoScalarWhereInput | ProdutoScalarWhereInput[]
  }

  export type CursoCreateNestedOneWithoutProdutosInput = {
    create?: XOR<CursoCreateWithoutProdutosInput, CursoUncheckedCreateWithoutProdutosInput>
    connectOrCreate?: CursoCreateOrConnectWithoutProdutosInput
    connect?: CursoWhereUniqueInput
  }

  export type TurmaCreateNestedOneWithoutProdutosInput = {
    create?: XOR<TurmaCreateWithoutProdutosInput, TurmaUncheckedCreateWithoutProdutosInput>
    connectOrCreate?: TurmaCreateOrConnectWithoutProdutosInput
    connect?: TurmaWhereUniqueInput
  }

  export type OperacaoCreateNestedManyWithoutProdutoInput = {
    create?: XOR<OperacaoCreateWithoutProdutoInput, OperacaoUncheckedCreateWithoutProdutoInput> | OperacaoCreateWithoutProdutoInput[] | OperacaoUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: OperacaoCreateOrConnectWithoutProdutoInput | OperacaoCreateOrConnectWithoutProdutoInput[]
    createMany?: OperacaoCreateManyProdutoInputEnvelope
    connect?: OperacaoWhereUniqueInput | OperacaoWhereUniqueInput[]
  }

  export type OperacaoUncheckedCreateNestedManyWithoutProdutoInput = {
    create?: XOR<OperacaoCreateWithoutProdutoInput, OperacaoUncheckedCreateWithoutProdutoInput> | OperacaoCreateWithoutProdutoInput[] | OperacaoUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: OperacaoCreateOrConnectWithoutProdutoInput | OperacaoCreateOrConnectWithoutProdutoInput[]
    createMany?: OperacaoCreateManyProdutoInputEnvelope
    connect?: OperacaoWhereUniqueInput | OperacaoWhereUniqueInput[]
  }

  export type CursoUpdateOneRequiredWithoutProdutosNestedInput = {
    create?: XOR<CursoCreateWithoutProdutosInput, CursoUncheckedCreateWithoutProdutosInput>
    connectOrCreate?: CursoCreateOrConnectWithoutProdutosInput
    upsert?: CursoUpsertWithoutProdutosInput
    connect?: CursoWhereUniqueInput
    update?: XOR<XOR<CursoUpdateToOneWithWhereWithoutProdutosInput, CursoUpdateWithoutProdutosInput>, CursoUncheckedUpdateWithoutProdutosInput>
  }

  export type TurmaUpdateOneRequiredWithoutProdutosNestedInput = {
    create?: XOR<TurmaCreateWithoutProdutosInput, TurmaUncheckedCreateWithoutProdutosInput>
    connectOrCreate?: TurmaCreateOrConnectWithoutProdutosInput
    upsert?: TurmaUpsertWithoutProdutosInput
    connect?: TurmaWhereUniqueInput
    update?: XOR<XOR<TurmaUpdateToOneWithWhereWithoutProdutosInput, TurmaUpdateWithoutProdutosInput>, TurmaUncheckedUpdateWithoutProdutosInput>
  }

  export type OperacaoUpdateManyWithoutProdutoNestedInput = {
    create?: XOR<OperacaoCreateWithoutProdutoInput, OperacaoUncheckedCreateWithoutProdutoInput> | OperacaoCreateWithoutProdutoInput[] | OperacaoUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: OperacaoCreateOrConnectWithoutProdutoInput | OperacaoCreateOrConnectWithoutProdutoInput[]
    upsert?: OperacaoUpsertWithWhereUniqueWithoutProdutoInput | OperacaoUpsertWithWhereUniqueWithoutProdutoInput[]
    createMany?: OperacaoCreateManyProdutoInputEnvelope
    set?: OperacaoWhereUniqueInput | OperacaoWhereUniqueInput[]
    disconnect?: OperacaoWhereUniqueInput | OperacaoWhereUniqueInput[]
    delete?: OperacaoWhereUniqueInput | OperacaoWhereUniqueInput[]
    connect?: OperacaoWhereUniqueInput | OperacaoWhereUniqueInput[]
    update?: OperacaoUpdateWithWhereUniqueWithoutProdutoInput | OperacaoUpdateWithWhereUniqueWithoutProdutoInput[]
    updateMany?: OperacaoUpdateManyWithWhereWithoutProdutoInput | OperacaoUpdateManyWithWhereWithoutProdutoInput[]
    deleteMany?: OperacaoScalarWhereInput | OperacaoScalarWhereInput[]
  }

  export type OperacaoUncheckedUpdateManyWithoutProdutoNestedInput = {
    create?: XOR<OperacaoCreateWithoutProdutoInput, OperacaoUncheckedCreateWithoutProdutoInput> | OperacaoCreateWithoutProdutoInput[] | OperacaoUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: OperacaoCreateOrConnectWithoutProdutoInput | OperacaoCreateOrConnectWithoutProdutoInput[]
    upsert?: OperacaoUpsertWithWhereUniqueWithoutProdutoInput | OperacaoUpsertWithWhereUniqueWithoutProdutoInput[]
    createMany?: OperacaoCreateManyProdutoInputEnvelope
    set?: OperacaoWhereUniqueInput | OperacaoWhereUniqueInput[]
    disconnect?: OperacaoWhereUniqueInput | OperacaoWhereUniqueInput[]
    delete?: OperacaoWhereUniqueInput | OperacaoWhereUniqueInput[]
    connect?: OperacaoWhereUniqueInput | OperacaoWhereUniqueInput[]
    update?: OperacaoUpdateWithWhereUniqueWithoutProdutoInput | OperacaoUpdateWithWhereUniqueWithoutProdutoInput[]
    updateMany?: OperacaoUpdateManyWithWhereWithoutProdutoInput | OperacaoUpdateManyWithWhereWithoutProdutoInput[]
    deleteMany?: OperacaoScalarWhereInput | OperacaoScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutOperacoesInput = {
    create?: XOR<UserCreateWithoutOperacoesInput, UserUncheckedCreateWithoutOperacoesInput>
    connectOrCreate?: UserCreateOrConnectWithoutOperacoesInput
    connect?: UserWhereUniqueInput
  }

  export type ProdutoCreateNestedOneWithoutOperacoesInput = {
    create?: XOR<ProdutoCreateWithoutOperacoesInput, ProdutoUncheckedCreateWithoutOperacoesInput>
    connectOrCreate?: ProdutoCreateOrConnectWithoutOperacoesInput
    connect?: ProdutoWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutOperacoesNestedInput = {
    create?: XOR<UserCreateWithoutOperacoesInput, UserUncheckedCreateWithoutOperacoesInput>
    connectOrCreate?: UserCreateOrConnectWithoutOperacoesInput
    upsert?: UserUpsertWithoutOperacoesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOperacoesInput, UserUpdateWithoutOperacoesInput>, UserUncheckedUpdateWithoutOperacoesInput>
  }

  export type ProdutoUpdateOneRequiredWithoutOperacoesNestedInput = {
    create?: XOR<ProdutoCreateWithoutOperacoesInput, ProdutoUncheckedCreateWithoutOperacoesInput>
    connectOrCreate?: ProdutoCreateOrConnectWithoutOperacoesInput
    upsert?: ProdutoUpsertWithoutOperacoesInput
    connect?: ProdutoWhereUniqueInput
    update?: XOR<XOR<ProdutoUpdateToOneWithWhereWithoutOperacoesInput, ProdutoUpdateWithoutOperacoesInput>, ProdutoUncheckedUpdateWithoutOperacoesInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type TurmaCreateWithoutCursoInput = {
    uuid?: string
    codigoTurma: string
    turnoTurma: string
    status: boolean
    produtos?: ProdutoCreateNestedManyWithoutTurmaInput
  }

  export type TurmaUncheckedCreateWithoutCursoInput = {
    idTurma?: number
    uuid?: string
    codigoTurma: string
    turnoTurma: string
    status: boolean
    produtos?: ProdutoUncheckedCreateNestedManyWithoutTurmaInput
  }

  export type TurmaCreateOrConnectWithoutCursoInput = {
    where: TurmaWhereUniqueInput
    create: XOR<TurmaCreateWithoutCursoInput, TurmaUncheckedCreateWithoutCursoInput>
  }

  export type TurmaCreateManyCursoInputEnvelope = {
    data: TurmaCreateManyCursoInput | TurmaCreateManyCursoInput[]
    skipDuplicates?: boolean
  }

  export type ProdutoCreateWithoutCursoInput = {
    uuid?: string
    prodDescricao: string
    prodFabricante: string
    prodQuantidade: number
    prodValidade: Date | string
    prodLote: string
    turma: TurmaCreateNestedOneWithoutProdutosInput
    operacoes?: OperacaoCreateNestedManyWithoutProdutoInput
  }

  export type ProdutoUncheckedCreateWithoutCursoInput = {
    idProduto?: number
    uuid?: string
    prodDescricao: string
    prodFabricante: string
    prodQuantidade: number
    prodValidade: Date | string
    prodLote: string
    prodTurma: number
    operacoes?: OperacaoUncheckedCreateNestedManyWithoutProdutoInput
  }

  export type ProdutoCreateOrConnectWithoutCursoInput = {
    where: ProdutoWhereUniqueInput
    create: XOR<ProdutoCreateWithoutCursoInput, ProdutoUncheckedCreateWithoutCursoInput>
  }

  export type ProdutoCreateManyCursoInputEnvelope = {
    data: ProdutoCreateManyCursoInput | ProdutoCreateManyCursoInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutCursoInput = {
    nome: string
    email: string
    password: string
    role?: $Enums.Role
    status?: boolean
    created_by: number
    created_at?: Date | string
    updated_at?: Date | string
    operacoes?: OperacaoCreateNestedManyWithoutUsuarioInput
  }

  export type UserUncheckedCreateWithoutCursoInput = {
    idUser?: number
    nome: string
    email: string
    password: string
    role?: $Enums.Role
    status?: boolean
    created_by: number
    created_at?: Date | string
    updated_at?: Date | string
    operacoes?: OperacaoUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UserCreateOrConnectWithoutCursoInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCursoInput, UserUncheckedCreateWithoutCursoInput>
  }

  export type UserCreateManyCursoInputEnvelope = {
    data: UserCreateManyCursoInput | UserCreateManyCursoInput[]
    skipDuplicates?: boolean
  }

  export type TurmaUpsertWithWhereUniqueWithoutCursoInput = {
    where: TurmaWhereUniqueInput
    update: XOR<TurmaUpdateWithoutCursoInput, TurmaUncheckedUpdateWithoutCursoInput>
    create: XOR<TurmaCreateWithoutCursoInput, TurmaUncheckedCreateWithoutCursoInput>
  }

  export type TurmaUpdateWithWhereUniqueWithoutCursoInput = {
    where: TurmaWhereUniqueInput
    data: XOR<TurmaUpdateWithoutCursoInput, TurmaUncheckedUpdateWithoutCursoInput>
  }

  export type TurmaUpdateManyWithWhereWithoutCursoInput = {
    where: TurmaScalarWhereInput
    data: XOR<TurmaUpdateManyMutationInput, TurmaUncheckedUpdateManyWithoutCursoInput>
  }

  export type TurmaScalarWhereInput = {
    AND?: TurmaScalarWhereInput | TurmaScalarWhereInput[]
    OR?: TurmaScalarWhereInput[]
    NOT?: TurmaScalarWhereInput | TurmaScalarWhereInput[]
    idTurma?: IntFilter<"Turma"> | number
    uuid?: StringFilter<"Turma"> | string
    codigoTurma?: StringFilter<"Turma"> | string
    turnoTurma?: StringFilter<"Turma"> | string
    idCurso?: IntFilter<"Turma"> | number
    status?: BoolFilter<"Turma"> | boolean
  }

  export type ProdutoUpsertWithWhereUniqueWithoutCursoInput = {
    where: ProdutoWhereUniqueInput
    update: XOR<ProdutoUpdateWithoutCursoInput, ProdutoUncheckedUpdateWithoutCursoInput>
    create: XOR<ProdutoCreateWithoutCursoInput, ProdutoUncheckedCreateWithoutCursoInput>
  }

  export type ProdutoUpdateWithWhereUniqueWithoutCursoInput = {
    where: ProdutoWhereUniqueInput
    data: XOR<ProdutoUpdateWithoutCursoInput, ProdutoUncheckedUpdateWithoutCursoInput>
  }

  export type ProdutoUpdateManyWithWhereWithoutCursoInput = {
    where: ProdutoScalarWhereInput
    data: XOR<ProdutoUpdateManyMutationInput, ProdutoUncheckedUpdateManyWithoutCursoInput>
  }

  export type ProdutoScalarWhereInput = {
    AND?: ProdutoScalarWhereInput | ProdutoScalarWhereInput[]
    OR?: ProdutoScalarWhereInput[]
    NOT?: ProdutoScalarWhereInput | ProdutoScalarWhereInput[]
    idProduto?: IntFilter<"Produto"> | number
    uuid?: StringFilter<"Produto"> | string
    prodDescricao?: StringFilter<"Produto"> | string
    prodFabricante?: StringFilter<"Produto"> | string
    prodQuantidade?: IntFilter<"Produto"> | number
    prodValidade?: DateTimeFilter<"Produto"> | Date | string
    prodLote?: StringFilter<"Produto"> | string
    prodCurso?: IntFilter<"Produto"> | number
    prodTurma?: IntFilter<"Produto"> | number
  }

  export type UserUpsertWithWhereUniqueWithoutCursoInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutCursoInput, UserUncheckedUpdateWithoutCursoInput>
    create: XOR<UserCreateWithoutCursoInput, UserUncheckedCreateWithoutCursoInput>
  }

  export type UserUpdateWithWhereUniqueWithoutCursoInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutCursoInput, UserUncheckedUpdateWithoutCursoInput>
  }

  export type UserUpdateManyWithWhereWithoutCursoInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutCursoInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    idUser?: IntFilter<"User"> | number
    nome?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    idCurso?: IntNullableFilter<"User"> | number | null
    status?: BoolFilter<"User"> | boolean
    created_by?: IntFilter<"User"> | number
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
  }

  export type CursoCreateWithoutUsersInput = {
    nomeCurso: string
    status?: boolean
    turmas?: TurmaCreateNestedManyWithoutCursoInput
    produtos?: ProdutoCreateNestedManyWithoutCursoInput
  }

  export type CursoUncheckedCreateWithoutUsersInput = {
    idCurso?: number
    nomeCurso: string
    status?: boolean
    turmas?: TurmaUncheckedCreateNestedManyWithoutCursoInput
    produtos?: ProdutoUncheckedCreateNestedManyWithoutCursoInput
  }

  export type CursoCreateOrConnectWithoutUsersInput = {
    where: CursoWhereUniqueInput
    create: XOR<CursoCreateWithoutUsersInput, CursoUncheckedCreateWithoutUsersInput>
  }

  export type OperacaoCreateWithoutUsuarioInput = {
    tipoOperacao: number
    data: Date | string
    quantidade: number
    produto: ProdutoCreateNestedOneWithoutOperacoesInput
  }

  export type OperacaoUncheckedCreateWithoutUsuarioInput = {
    idOperacao?: number
    tipoOperacao: number
    idProduto: number
    data: Date | string
    quantidade: number
  }

  export type OperacaoCreateOrConnectWithoutUsuarioInput = {
    where: OperacaoWhereUniqueInput
    create: XOR<OperacaoCreateWithoutUsuarioInput, OperacaoUncheckedCreateWithoutUsuarioInput>
  }

  export type OperacaoCreateManyUsuarioInputEnvelope = {
    data: OperacaoCreateManyUsuarioInput | OperacaoCreateManyUsuarioInput[]
    skipDuplicates?: boolean
  }

  export type CursoUpsertWithoutUsersInput = {
    update: XOR<CursoUpdateWithoutUsersInput, CursoUncheckedUpdateWithoutUsersInput>
    create: XOR<CursoCreateWithoutUsersInput, CursoUncheckedCreateWithoutUsersInput>
    where?: CursoWhereInput
  }

  export type CursoUpdateToOneWithWhereWithoutUsersInput = {
    where?: CursoWhereInput
    data: XOR<CursoUpdateWithoutUsersInput, CursoUncheckedUpdateWithoutUsersInput>
  }

  export type CursoUpdateWithoutUsersInput = {
    nomeCurso?: StringFieldUpdateOperationsInput | string
    status?: BoolFieldUpdateOperationsInput | boolean
    turmas?: TurmaUpdateManyWithoutCursoNestedInput
    produtos?: ProdutoUpdateManyWithoutCursoNestedInput
  }

  export type CursoUncheckedUpdateWithoutUsersInput = {
    idCurso?: IntFieldUpdateOperationsInput | number
    nomeCurso?: StringFieldUpdateOperationsInput | string
    status?: BoolFieldUpdateOperationsInput | boolean
    turmas?: TurmaUncheckedUpdateManyWithoutCursoNestedInput
    produtos?: ProdutoUncheckedUpdateManyWithoutCursoNestedInput
  }

  export type OperacaoUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: OperacaoWhereUniqueInput
    update: XOR<OperacaoUpdateWithoutUsuarioInput, OperacaoUncheckedUpdateWithoutUsuarioInput>
    create: XOR<OperacaoCreateWithoutUsuarioInput, OperacaoUncheckedCreateWithoutUsuarioInput>
  }

  export type OperacaoUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: OperacaoWhereUniqueInput
    data: XOR<OperacaoUpdateWithoutUsuarioInput, OperacaoUncheckedUpdateWithoutUsuarioInput>
  }

  export type OperacaoUpdateManyWithWhereWithoutUsuarioInput = {
    where: OperacaoScalarWhereInput
    data: XOR<OperacaoUpdateManyMutationInput, OperacaoUncheckedUpdateManyWithoutUsuarioInput>
  }

  export type OperacaoScalarWhereInput = {
    AND?: OperacaoScalarWhereInput | OperacaoScalarWhereInput[]
    OR?: OperacaoScalarWhereInput[]
    NOT?: OperacaoScalarWhereInput | OperacaoScalarWhereInput[]
    idOperacao?: IntFilter<"Operacao"> | number
    tipoOperacao?: IntFilter<"Operacao"> | number
    idUsuario?: IntFilter<"Operacao"> | number
    idProduto?: IntFilter<"Operacao"> | number
    data?: DateTimeFilter<"Operacao"> | Date | string
    quantidade?: IntFilter<"Operacao"> | number
  }

  export type CursoCreateWithoutTurmasInput = {
    nomeCurso: string
    status?: boolean
    produtos?: ProdutoCreateNestedManyWithoutCursoInput
    users?: UserCreateNestedManyWithoutCursoInput
  }

  export type CursoUncheckedCreateWithoutTurmasInput = {
    idCurso?: number
    nomeCurso: string
    status?: boolean
    produtos?: ProdutoUncheckedCreateNestedManyWithoutCursoInput
    users?: UserUncheckedCreateNestedManyWithoutCursoInput
  }

  export type CursoCreateOrConnectWithoutTurmasInput = {
    where: CursoWhereUniqueInput
    create: XOR<CursoCreateWithoutTurmasInput, CursoUncheckedCreateWithoutTurmasInput>
  }

  export type ProdutoCreateWithoutTurmaInput = {
    uuid?: string
    prodDescricao: string
    prodFabricante: string
    prodQuantidade: number
    prodValidade: Date | string
    prodLote: string
    curso: CursoCreateNestedOneWithoutProdutosInput
    operacoes?: OperacaoCreateNestedManyWithoutProdutoInput
  }

  export type ProdutoUncheckedCreateWithoutTurmaInput = {
    idProduto?: number
    uuid?: string
    prodDescricao: string
    prodFabricante: string
    prodQuantidade: number
    prodValidade: Date | string
    prodLote: string
    prodCurso: number
    operacoes?: OperacaoUncheckedCreateNestedManyWithoutProdutoInput
  }

  export type ProdutoCreateOrConnectWithoutTurmaInput = {
    where: ProdutoWhereUniqueInput
    create: XOR<ProdutoCreateWithoutTurmaInput, ProdutoUncheckedCreateWithoutTurmaInput>
  }

  export type ProdutoCreateManyTurmaInputEnvelope = {
    data: ProdutoCreateManyTurmaInput | ProdutoCreateManyTurmaInput[]
    skipDuplicates?: boolean
  }

  export type CursoUpsertWithoutTurmasInput = {
    update: XOR<CursoUpdateWithoutTurmasInput, CursoUncheckedUpdateWithoutTurmasInput>
    create: XOR<CursoCreateWithoutTurmasInput, CursoUncheckedCreateWithoutTurmasInput>
    where?: CursoWhereInput
  }

  export type CursoUpdateToOneWithWhereWithoutTurmasInput = {
    where?: CursoWhereInput
    data: XOR<CursoUpdateWithoutTurmasInput, CursoUncheckedUpdateWithoutTurmasInput>
  }

  export type CursoUpdateWithoutTurmasInput = {
    nomeCurso?: StringFieldUpdateOperationsInput | string
    status?: BoolFieldUpdateOperationsInput | boolean
    produtos?: ProdutoUpdateManyWithoutCursoNestedInput
    users?: UserUpdateManyWithoutCursoNestedInput
  }

  export type CursoUncheckedUpdateWithoutTurmasInput = {
    idCurso?: IntFieldUpdateOperationsInput | number
    nomeCurso?: StringFieldUpdateOperationsInput | string
    status?: BoolFieldUpdateOperationsInput | boolean
    produtos?: ProdutoUncheckedUpdateManyWithoutCursoNestedInput
    users?: UserUncheckedUpdateManyWithoutCursoNestedInput
  }

  export type ProdutoUpsertWithWhereUniqueWithoutTurmaInput = {
    where: ProdutoWhereUniqueInput
    update: XOR<ProdutoUpdateWithoutTurmaInput, ProdutoUncheckedUpdateWithoutTurmaInput>
    create: XOR<ProdutoCreateWithoutTurmaInput, ProdutoUncheckedCreateWithoutTurmaInput>
  }

  export type ProdutoUpdateWithWhereUniqueWithoutTurmaInput = {
    where: ProdutoWhereUniqueInput
    data: XOR<ProdutoUpdateWithoutTurmaInput, ProdutoUncheckedUpdateWithoutTurmaInput>
  }

  export type ProdutoUpdateManyWithWhereWithoutTurmaInput = {
    where: ProdutoScalarWhereInput
    data: XOR<ProdutoUpdateManyMutationInput, ProdutoUncheckedUpdateManyWithoutTurmaInput>
  }

  export type CursoCreateWithoutProdutosInput = {
    nomeCurso: string
    status?: boolean
    turmas?: TurmaCreateNestedManyWithoutCursoInput
    users?: UserCreateNestedManyWithoutCursoInput
  }

  export type CursoUncheckedCreateWithoutProdutosInput = {
    idCurso?: number
    nomeCurso: string
    status?: boolean
    turmas?: TurmaUncheckedCreateNestedManyWithoutCursoInput
    users?: UserUncheckedCreateNestedManyWithoutCursoInput
  }

  export type CursoCreateOrConnectWithoutProdutosInput = {
    where: CursoWhereUniqueInput
    create: XOR<CursoCreateWithoutProdutosInput, CursoUncheckedCreateWithoutProdutosInput>
  }

  export type TurmaCreateWithoutProdutosInput = {
    uuid?: string
    codigoTurma: string
    turnoTurma: string
    status: boolean
    curso: CursoCreateNestedOneWithoutTurmasInput
  }

  export type TurmaUncheckedCreateWithoutProdutosInput = {
    idTurma?: number
    uuid?: string
    codigoTurma: string
    turnoTurma: string
    idCurso: number
    status: boolean
  }

  export type TurmaCreateOrConnectWithoutProdutosInput = {
    where: TurmaWhereUniqueInput
    create: XOR<TurmaCreateWithoutProdutosInput, TurmaUncheckedCreateWithoutProdutosInput>
  }

  export type OperacaoCreateWithoutProdutoInput = {
    tipoOperacao: number
    data: Date | string
    quantidade: number
    usuario: UserCreateNestedOneWithoutOperacoesInput
  }

  export type OperacaoUncheckedCreateWithoutProdutoInput = {
    idOperacao?: number
    tipoOperacao: number
    idUsuario: number
    data: Date | string
    quantidade: number
  }

  export type OperacaoCreateOrConnectWithoutProdutoInput = {
    where: OperacaoWhereUniqueInput
    create: XOR<OperacaoCreateWithoutProdutoInput, OperacaoUncheckedCreateWithoutProdutoInput>
  }

  export type OperacaoCreateManyProdutoInputEnvelope = {
    data: OperacaoCreateManyProdutoInput | OperacaoCreateManyProdutoInput[]
    skipDuplicates?: boolean
  }

  export type CursoUpsertWithoutProdutosInput = {
    update: XOR<CursoUpdateWithoutProdutosInput, CursoUncheckedUpdateWithoutProdutosInput>
    create: XOR<CursoCreateWithoutProdutosInput, CursoUncheckedCreateWithoutProdutosInput>
    where?: CursoWhereInput
  }

  export type CursoUpdateToOneWithWhereWithoutProdutosInput = {
    where?: CursoWhereInput
    data: XOR<CursoUpdateWithoutProdutosInput, CursoUncheckedUpdateWithoutProdutosInput>
  }

  export type CursoUpdateWithoutProdutosInput = {
    nomeCurso?: StringFieldUpdateOperationsInput | string
    status?: BoolFieldUpdateOperationsInput | boolean
    turmas?: TurmaUpdateManyWithoutCursoNestedInput
    users?: UserUpdateManyWithoutCursoNestedInput
  }

  export type CursoUncheckedUpdateWithoutProdutosInput = {
    idCurso?: IntFieldUpdateOperationsInput | number
    nomeCurso?: StringFieldUpdateOperationsInput | string
    status?: BoolFieldUpdateOperationsInput | boolean
    turmas?: TurmaUncheckedUpdateManyWithoutCursoNestedInput
    users?: UserUncheckedUpdateManyWithoutCursoNestedInput
  }

  export type TurmaUpsertWithoutProdutosInput = {
    update: XOR<TurmaUpdateWithoutProdutosInput, TurmaUncheckedUpdateWithoutProdutosInput>
    create: XOR<TurmaCreateWithoutProdutosInput, TurmaUncheckedCreateWithoutProdutosInput>
    where?: TurmaWhereInput
  }

  export type TurmaUpdateToOneWithWhereWithoutProdutosInput = {
    where?: TurmaWhereInput
    data: XOR<TurmaUpdateWithoutProdutosInput, TurmaUncheckedUpdateWithoutProdutosInput>
  }

  export type TurmaUpdateWithoutProdutosInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    codigoTurma?: StringFieldUpdateOperationsInput | string
    turnoTurma?: StringFieldUpdateOperationsInput | string
    status?: BoolFieldUpdateOperationsInput | boolean
    curso?: CursoUpdateOneRequiredWithoutTurmasNestedInput
  }

  export type TurmaUncheckedUpdateWithoutProdutosInput = {
    idTurma?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    codigoTurma?: StringFieldUpdateOperationsInput | string
    turnoTurma?: StringFieldUpdateOperationsInput | string
    idCurso?: IntFieldUpdateOperationsInput | number
    status?: BoolFieldUpdateOperationsInput | boolean
  }

  export type OperacaoUpsertWithWhereUniqueWithoutProdutoInput = {
    where: OperacaoWhereUniqueInput
    update: XOR<OperacaoUpdateWithoutProdutoInput, OperacaoUncheckedUpdateWithoutProdutoInput>
    create: XOR<OperacaoCreateWithoutProdutoInput, OperacaoUncheckedCreateWithoutProdutoInput>
  }

  export type OperacaoUpdateWithWhereUniqueWithoutProdutoInput = {
    where: OperacaoWhereUniqueInput
    data: XOR<OperacaoUpdateWithoutProdutoInput, OperacaoUncheckedUpdateWithoutProdutoInput>
  }

  export type OperacaoUpdateManyWithWhereWithoutProdutoInput = {
    where: OperacaoScalarWhereInput
    data: XOR<OperacaoUpdateManyMutationInput, OperacaoUncheckedUpdateManyWithoutProdutoInput>
  }

  export type UserCreateWithoutOperacoesInput = {
    nome: string
    email: string
    password: string
    role?: $Enums.Role
    status?: boolean
    created_by: number
    created_at?: Date | string
    updated_at?: Date | string
    curso?: CursoCreateNestedOneWithoutUsersInput
  }

  export type UserUncheckedCreateWithoutOperacoesInput = {
    idUser?: number
    nome: string
    email: string
    password: string
    role?: $Enums.Role
    idCurso?: number | null
    status?: boolean
    created_by: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type UserCreateOrConnectWithoutOperacoesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOperacoesInput, UserUncheckedCreateWithoutOperacoesInput>
  }

  export type ProdutoCreateWithoutOperacoesInput = {
    uuid?: string
    prodDescricao: string
    prodFabricante: string
    prodQuantidade: number
    prodValidade: Date | string
    prodLote: string
    curso: CursoCreateNestedOneWithoutProdutosInput
    turma: TurmaCreateNestedOneWithoutProdutosInput
  }

  export type ProdutoUncheckedCreateWithoutOperacoesInput = {
    idProduto?: number
    uuid?: string
    prodDescricao: string
    prodFabricante: string
    prodQuantidade: number
    prodValidade: Date | string
    prodLote: string
    prodCurso: number
    prodTurma: number
  }

  export type ProdutoCreateOrConnectWithoutOperacoesInput = {
    where: ProdutoWhereUniqueInput
    create: XOR<ProdutoCreateWithoutOperacoesInput, ProdutoUncheckedCreateWithoutOperacoesInput>
  }

  export type UserUpsertWithoutOperacoesInput = {
    update: XOR<UserUpdateWithoutOperacoesInput, UserUncheckedUpdateWithoutOperacoesInput>
    create: XOR<UserCreateWithoutOperacoesInput, UserUncheckedCreateWithoutOperacoesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOperacoesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOperacoesInput, UserUncheckedUpdateWithoutOperacoesInput>
  }

  export type UserUpdateWithoutOperacoesInput = {
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: BoolFieldUpdateOperationsInput | boolean
    created_by?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    curso?: CursoUpdateOneWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateWithoutOperacoesInput = {
    idUser?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    idCurso?: NullableIntFieldUpdateOperationsInput | number | null
    status?: BoolFieldUpdateOperationsInput | boolean
    created_by?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProdutoUpsertWithoutOperacoesInput = {
    update: XOR<ProdutoUpdateWithoutOperacoesInput, ProdutoUncheckedUpdateWithoutOperacoesInput>
    create: XOR<ProdutoCreateWithoutOperacoesInput, ProdutoUncheckedCreateWithoutOperacoesInput>
    where?: ProdutoWhereInput
  }

  export type ProdutoUpdateToOneWithWhereWithoutOperacoesInput = {
    where?: ProdutoWhereInput
    data: XOR<ProdutoUpdateWithoutOperacoesInput, ProdutoUncheckedUpdateWithoutOperacoesInput>
  }

  export type ProdutoUpdateWithoutOperacoesInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    prodDescricao?: StringFieldUpdateOperationsInput | string
    prodFabricante?: StringFieldUpdateOperationsInput | string
    prodQuantidade?: IntFieldUpdateOperationsInput | number
    prodValidade?: DateTimeFieldUpdateOperationsInput | Date | string
    prodLote?: StringFieldUpdateOperationsInput | string
    curso?: CursoUpdateOneRequiredWithoutProdutosNestedInput
    turma?: TurmaUpdateOneRequiredWithoutProdutosNestedInput
  }

  export type ProdutoUncheckedUpdateWithoutOperacoesInput = {
    idProduto?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    prodDescricao?: StringFieldUpdateOperationsInput | string
    prodFabricante?: StringFieldUpdateOperationsInput | string
    prodQuantidade?: IntFieldUpdateOperationsInput | number
    prodValidade?: DateTimeFieldUpdateOperationsInput | Date | string
    prodLote?: StringFieldUpdateOperationsInput | string
    prodCurso?: IntFieldUpdateOperationsInput | number
    prodTurma?: IntFieldUpdateOperationsInput | number
  }

  export type TurmaCreateManyCursoInput = {
    idTurma?: number
    uuid?: string
    codigoTurma: string
    turnoTurma: string
    status: boolean
  }

  export type ProdutoCreateManyCursoInput = {
    idProduto?: number
    uuid?: string
    prodDescricao: string
    prodFabricante: string
    prodQuantidade: number
    prodValidade: Date | string
    prodLote: string
    prodTurma: number
  }

  export type UserCreateManyCursoInput = {
    idUser?: number
    nome: string
    email: string
    password: string
    role?: $Enums.Role
    status?: boolean
    created_by: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TurmaUpdateWithoutCursoInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    codigoTurma?: StringFieldUpdateOperationsInput | string
    turnoTurma?: StringFieldUpdateOperationsInput | string
    status?: BoolFieldUpdateOperationsInput | boolean
    produtos?: ProdutoUpdateManyWithoutTurmaNestedInput
  }

  export type TurmaUncheckedUpdateWithoutCursoInput = {
    idTurma?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    codigoTurma?: StringFieldUpdateOperationsInput | string
    turnoTurma?: StringFieldUpdateOperationsInput | string
    status?: BoolFieldUpdateOperationsInput | boolean
    produtos?: ProdutoUncheckedUpdateManyWithoutTurmaNestedInput
  }

  export type TurmaUncheckedUpdateManyWithoutCursoInput = {
    idTurma?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    codigoTurma?: StringFieldUpdateOperationsInput | string
    turnoTurma?: StringFieldUpdateOperationsInput | string
    status?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProdutoUpdateWithoutCursoInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    prodDescricao?: StringFieldUpdateOperationsInput | string
    prodFabricante?: StringFieldUpdateOperationsInput | string
    prodQuantidade?: IntFieldUpdateOperationsInput | number
    prodValidade?: DateTimeFieldUpdateOperationsInput | Date | string
    prodLote?: StringFieldUpdateOperationsInput | string
    turma?: TurmaUpdateOneRequiredWithoutProdutosNestedInput
    operacoes?: OperacaoUpdateManyWithoutProdutoNestedInput
  }

  export type ProdutoUncheckedUpdateWithoutCursoInput = {
    idProduto?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    prodDescricao?: StringFieldUpdateOperationsInput | string
    prodFabricante?: StringFieldUpdateOperationsInput | string
    prodQuantidade?: IntFieldUpdateOperationsInput | number
    prodValidade?: DateTimeFieldUpdateOperationsInput | Date | string
    prodLote?: StringFieldUpdateOperationsInput | string
    prodTurma?: IntFieldUpdateOperationsInput | number
    operacoes?: OperacaoUncheckedUpdateManyWithoutProdutoNestedInput
  }

  export type ProdutoUncheckedUpdateManyWithoutCursoInput = {
    idProduto?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    prodDescricao?: StringFieldUpdateOperationsInput | string
    prodFabricante?: StringFieldUpdateOperationsInput | string
    prodQuantidade?: IntFieldUpdateOperationsInput | number
    prodValidade?: DateTimeFieldUpdateOperationsInput | Date | string
    prodLote?: StringFieldUpdateOperationsInput | string
    prodTurma?: IntFieldUpdateOperationsInput | number
  }

  export type UserUpdateWithoutCursoInput = {
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: BoolFieldUpdateOperationsInput | boolean
    created_by?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    operacoes?: OperacaoUpdateManyWithoutUsuarioNestedInput
  }

  export type UserUncheckedUpdateWithoutCursoInput = {
    idUser?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: BoolFieldUpdateOperationsInput | boolean
    created_by?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    operacoes?: OperacaoUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type UserUncheckedUpdateManyWithoutCursoInput = {
    idUser?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: BoolFieldUpdateOperationsInput | boolean
    created_by?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OperacaoCreateManyUsuarioInput = {
    idOperacao?: number
    tipoOperacao: number
    idProduto: number
    data: Date | string
    quantidade: number
  }

  export type OperacaoUpdateWithoutUsuarioInput = {
    tipoOperacao?: IntFieldUpdateOperationsInput | number
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    quantidade?: IntFieldUpdateOperationsInput | number
    produto?: ProdutoUpdateOneRequiredWithoutOperacoesNestedInput
  }

  export type OperacaoUncheckedUpdateWithoutUsuarioInput = {
    idOperacao?: IntFieldUpdateOperationsInput | number
    tipoOperacao?: IntFieldUpdateOperationsInput | number
    idProduto?: IntFieldUpdateOperationsInput | number
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    quantidade?: IntFieldUpdateOperationsInput | number
  }

  export type OperacaoUncheckedUpdateManyWithoutUsuarioInput = {
    idOperacao?: IntFieldUpdateOperationsInput | number
    tipoOperacao?: IntFieldUpdateOperationsInput | number
    idProduto?: IntFieldUpdateOperationsInput | number
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    quantidade?: IntFieldUpdateOperationsInput | number
  }

  export type ProdutoCreateManyTurmaInput = {
    idProduto?: number
    uuid?: string
    prodDescricao: string
    prodFabricante: string
    prodQuantidade: number
    prodValidade: Date | string
    prodLote: string
    prodCurso: number
  }

  export type ProdutoUpdateWithoutTurmaInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    prodDescricao?: StringFieldUpdateOperationsInput | string
    prodFabricante?: StringFieldUpdateOperationsInput | string
    prodQuantidade?: IntFieldUpdateOperationsInput | number
    prodValidade?: DateTimeFieldUpdateOperationsInput | Date | string
    prodLote?: StringFieldUpdateOperationsInput | string
    curso?: CursoUpdateOneRequiredWithoutProdutosNestedInput
    operacoes?: OperacaoUpdateManyWithoutProdutoNestedInput
  }

  export type ProdutoUncheckedUpdateWithoutTurmaInput = {
    idProduto?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    prodDescricao?: StringFieldUpdateOperationsInput | string
    prodFabricante?: StringFieldUpdateOperationsInput | string
    prodQuantidade?: IntFieldUpdateOperationsInput | number
    prodValidade?: DateTimeFieldUpdateOperationsInput | Date | string
    prodLote?: StringFieldUpdateOperationsInput | string
    prodCurso?: IntFieldUpdateOperationsInput | number
    operacoes?: OperacaoUncheckedUpdateManyWithoutProdutoNestedInput
  }

  export type ProdutoUncheckedUpdateManyWithoutTurmaInput = {
    idProduto?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    prodDescricao?: StringFieldUpdateOperationsInput | string
    prodFabricante?: StringFieldUpdateOperationsInput | string
    prodQuantidade?: IntFieldUpdateOperationsInput | number
    prodValidade?: DateTimeFieldUpdateOperationsInput | Date | string
    prodLote?: StringFieldUpdateOperationsInput | string
    prodCurso?: IntFieldUpdateOperationsInput | number
  }

  export type OperacaoCreateManyProdutoInput = {
    idOperacao?: number
    tipoOperacao: number
    idUsuario: number
    data: Date | string
    quantidade: number
  }

  export type OperacaoUpdateWithoutProdutoInput = {
    tipoOperacao?: IntFieldUpdateOperationsInput | number
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    quantidade?: IntFieldUpdateOperationsInput | number
    usuario?: UserUpdateOneRequiredWithoutOperacoesNestedInput
  }

  export type OperacaoUncheckedUpdateWithoutProdutoInput = {
    idOperacao?: IntFieldUpdateOperationsInput | number
    tipoOperacao?: IntFieldUpdateOperationsInput | number
    idUsuario?: IntFieldUpdateOperationsInput | number
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    quantidade?: IntFieldUpdateOperationsInput | number
  }

  export type OperacaoUncheckedUpdateManyWithoutProdutoInput = {
    idOperacao?: IntFieldUpdateOperationsInput | number
    tipoOperacao?: IntFieldUpdateOperationsInput | number
    idUsuario?: IntFieldUpdateOperationsInput | number
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    quantidade?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}