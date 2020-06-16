# 通用解决方案：RESTful 强类型 Mock Server + 表单校验

## 前言

前后端分离的项目，其前端通常是不应该强依赖于后端来进行开发的。多年来，Mock 生态衍生出来的轮子层出不穷，其中比较有代表性的有：

- [json-server](https://github.com/typicode/json-server)
- [faker.js](https://github.com/marak/Faker.js)
- [Mock.js](https://github.com/nuysoft/Mock)（国人超爱用，因为有中文）

当然还有平台式的解决方案，例如 [easy-mock](https://github.com/easy-mock/easy-mock) 以及 [RAP](https://github.com/thx/rap2-delos) 等。

在纯 JavaScript 的时代，上述方案都是极好的，拥有大量的生产经验。但鉴于目前 TypeScript 已经逐渐成为主流，因此，在原本「方便 mock」基础上，我们还得追求强类型约束，但同时又要注意 DRY（Don't Repeat Yourself）以减少后期重构的成本。

（参考 GraphQL，也是依赖自动编译来生成对应的接口文件，而非人工编写。）

## 引入

本方案的核心是 [class-validator](https://github.com/typestack/class-validator)，其不仅能进行表单校验，还能在很大程度上替代 `interface` 的使用，真正做到 SSOT（Single Source Of Truth）。由此，项目中所用到的类型几乎都是由其所定义的 class 衍生（例如使用 Utility Types [`Pick`](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktk)），最大程度减少 DRY 与重构成本。后期所作的任何更改，都由 TypeScript compiler 为我们保驾护航。该理念与我们目前所采用的国际化（i18n）方案完全一致：「将强类型进行到底！Strong-Typed！Pro-Spec！」。

下面简单对比一下 class-validator 和流行的 [Yup](https://github.com/jquense/yup)（[Joi](https://github.com/hapijs/joi)、[Superstruct](https://github.com/ianstormtaylor/superstruct) 都是大同小异），明显前者的可读性和 DRY 做得更好。

```ts
import { IsInt, IsPositive, Min, Max, IsEmail } from 'class-validator'
import { transformAndValidate } from 'class-transformer-validator'

// 可直接当 interface 使用
class User {
  @IsInt()
  @IsPositive()
  id!: number

  @IsInt()
  @Min(0)
  @Max(150)
  age!: number

  @IsEmail()
  email?: string
}

const user: User = {
  id: 1,
  age: 2,
  email: 'hello@world.com'
}

transformAndValidate(User, user)
```

```ts
import * as yup from 'yup'

interface User {
  id: number
  age: number
  email?: string
}
const UserSchema = yup.object().shape({
  id: yup.number().required().positive().integer(),
  age: yup.number().required().min(0).max(150).integer(),
  email: yup.string().email()
})

const user: User = {
  id: 1,
  age: 2,
  email: 'hello@world.com'
}
UserSchema.validate(user)
```

当然了，语法好看是有代价的：包体略大。但对于目前极佳的网络传输（与压缩）性能而言，反倒是项目的可维护性更为重要。

## 强类型 Mock Server

Mock Server 代码位于 `src/mock` 目录，基于 [routing-controllers](https://github.com/typestack/routing-controllers) 搭建（本质上是一个更好用的 [Express.js](https://github.com/expressjs/express)，乃企业级开发框架 [Nest.js](https://github.com/nestjs/nest) 的轻便版）。

至于为什么放 `src` 下，原因有：

- Create React App 的[限制](https://stackoverflow.com/q/44114436/5172890)（然而我们为了支持装饰器引入了 [customize-cra](https://github.com/arackaf/customize-cra)，因此其实这并不是问题。。。）
- 我们没有使用 monorepo（例如 Yarn [workspace](https://classic.yarnpkg.com/en/docs/workspaces/)），因此拉到与 `src` 平级（甚至更高）也只是徒然增加 `../` 罢了
- 我们会频繁使用到 mock server 中的 class 文件，因此它们也理应算是源码（我再三思考下也找不到比放 `src/mock/controllers/*/_types` 更合适的地方，因为「后端」毫无疑问是数据之源）

### API Spec

例如，`src/mock/controllers/customers/_spec.ts` 中定义了当前 API 的规格（Spec），而后在 `src/mock/controllers/customers/index.ts` 中 `implements`。由此，后端提供多少 API 都是一目了然（这与国际化 i18n 方案中的 `_spec` 一脉相承），活脱就是一个 API 文档（在目前后端 API 文档不太完善的情况下将大有裨益）。

"Strong-Typed! Pro-Spec!"

### 强类型 Mock

借助 [Factory.ts](https://github.com/willryan/factory.ts) 和 [Chance.js](https://github.com/chancejs/chancejs)，我们可以轻易生成大量 strong-typed mock data。同样地，若 class 文件有任何更改，TypeScript compiler 都会指示要同步修改相应的 mock factory。

（选择 Chance.js 仅仅是因为 Faker.js 的文档做得不够讨喜。。。）

`src/mock/controllers/customers/_types` 下有大量的 class 文件，相信都是 self-explanatory 的（通常基类目录名都会带 `_` 下划线前缀以便于区分），最后统一使用 `index.ts` 和 `index.mock.ts` 导出，便于 `import`。

另外，这些 mock factory 将极大提高写测试（包括单元测试和自动化浏览器测试）的效率和可维护性。

### 组装整合

例如，`src/mock/controllers/customers/index.ts` 汇聚了上述所有提到的，辅以 routing-controllers 的 [Auto validating action params](https://github.com/typestack/routing-controllers#auto-validating-action-params) 特性，我们不仅仅能做到 type-safe（GraphQL 的一大卖点），还能做到 runtime-safe！这也将在之后的自动化测试中大大减轻「验证数据有效性」的工作量。

## 表单验证

由于这是 class-validator 的老本行，因此只需要打通其与 Material UI 的联系（bindings）即可。详情请直接参考 `src/utils/formValidation/useFormValidation.ts` 中的注释说明（其中还透露了 class 的另一个妙用：生成表单初始数据）。

由此，表单验证和视图层几乎完全解耦合，使得组件更加轻量化（错误信息的国际化也是在 class 文件中实现），还直接省去了使用 [react-hook-form](https://github.com/react-hook-form/react-hook-form) 或 [formik](https://github.com/jaredpalmer/formik) + [formik-material-ui](https://github.com/stackworx/formik-material-ui) 等[官方推荐的搭配](https://material-ui.com/components/text-fields/#complementary-projects)。
