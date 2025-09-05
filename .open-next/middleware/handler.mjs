
import {Buffer} from "node:buffer";
globalThis.Buffer = Buffer;

import {AsyncLocalStorage} from "node:async_hooks";
globalThis.AsyncLocalStorage = AsyncLocalStorage;


const defaultDefineProperty = Object.defineProperty;
Object.defineProperty = function(o, p, a) {
  if(p=== '__import_unsupported' && Boolean(globalThis.__import_unsupported)) {
    return;
  }
  return defaultDefineProperty(o, p, a);
};

  
  
  globalThis.openNextDebug = false;globalThis.openNextVersion = "3.7.6";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@opennextjs/aws/dist/utils/error.js
function isOpenNextError(e) {
  try {
    return "__openNextInternal" in e;
  } catch {
    return false;
  }
}
var init_error = __esm({
  "node_modules/@opennextjs/aws/dist/utils/error.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/adapters/logger.js
function debug(...args) {
  if (globalThis.openNextDebug) {
    console.log(...args);
  }
}
function warn(...args) {
  console.warn(...args);
}
function error(...args) {
  if (args.some((arg) => isDownplayedErrorLog(arg))) {
    return debug(...args);
  }
  if (args.some((arg) => isOpenNextError(arg))) {
    const error2 = args.find((arg) => isOpenNextError(arg));
    if (error2.logLevel < getOpenNextErrorLogLevel()) {
      return;
    }
    if (error2.logLevel === 0) {
      return console.log(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    if (error2.logLevel === 1) {
      return warn(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    return console.error(...args);
  }
  console.error(...args);
}
function getOpenNextErrorLogLevel() {
  const strLevel = process.env.OPEN_NEXT_ERROR_LOG_LEVEL ?? "1";
  switch (strLevel.toLowerCase()) {
    case "debug":
    case "0":
      return 0;
    case "error":
    case "2":
      return 2;
    default:
      return 1;
  }
}
var DOWNPLAYED_ERROR_LOGS, isDownplayedErrorLog;
var init_logger = __esm({
  "node_modules/@opennextjs/aws/dist/adapters/logger.js"() {
    init_error();
    DOWNPLAYED_ERROR_LOGS = [
      {
        clientName: "S3Client",
        commandName: "GetObjectCommand",
        errorName: "NoSuchKey"
      }
    ];
    isDownplayedErrorLog = (errorLog) => DOWNPLAYED_ERROR_LOGS.some((downplayedInput) => downplayedInput.clientName === errorLog?.clientName && downplayedInput.commandName === errorLog?.commandName && (downplayedInput.errorName === errorLog?.error?.name || downplayedInput.errorName === errorLog?.error?.Code));
  }
});

// node_modules/cookie/dist/index.js
var require_dist = __commonJS({
  "node_modules/cookie/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parse = parse3;
    exports.serialize = serialize;
    var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
    var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
    var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    var __toString = Object.prototype.toString;
    var NullObject = /* @__PURE__ */ (() => {
      const C = function() {
      };
      C.prototype = /* @__PURE__ */ Object.create(null);
      return C;
    })();
    function parse3(str, options) {
      const obj = new NullObject();
      const len = str.length;
      if (len < 2)
        return obj;
      const dec = options?.decode || decode;
      let index = 0;
      do {
        const eqIdx = str.indexOf("=", index);
        if (eqIdx === -1)
          break;
        const colonIdx = str.indexOf(";", index);
        const endIdx = colonIdx === -1 ? len : colonIdx;
        if (eqIdx > endIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        const keyStartIdx = startIndex(str, index, eqIdx);
        const keyEndIdx = endIndex(str, eqIdx, keyStartIdx);
        const key = str.slice(keyStartIdx, keyEndIdx);
        if (obj[key] === void 0) {
          let valStartIdx = startIndex(str, eqIdx + 1, endIdx);
          let valEndIdx = endIndex(str, endIdx, valStartIdx);
          const value = dec(str.slice(valStartIdx, valEndIdx));
          obj[key] = value;
        }
        index = endIdx + 1;
      } while (index < len);
      return obj;
    }
    function startIndex(str, index, max) {
      do {
        const code = str.charCodeAt(index);
        if (code !== 32 && code !== 9)
          return index;
      } while (++index < max);
      return max;
    }
    function endIndex(str, index, min) {
      while (index > min) {
        const code = str.charCodeAt(--index);
        if (code !== 32 && code !== 9)
          return index + 1;
      }
      return min;
    }
    function serialize(name, val, options) {
      const enc = options?.encode || encodeURIComponent;
      if (!cookieNameRegExp.test(name)) {
        throw new TypeError(`argument name is invalid: ${name}`);
      }
      const value = enc(val);
      if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${val}`);
      }
      let str = name + "=" + value;
      if (!options)
        return str;
      if (options.maxAge !== void 0) {
        if (!Number.isInteger(options.maxAge)) {
          throw new TypeError(`option maxAge is invalid: ${options.maxAge}`);
        }
        str += "; Max-Age=" + options.maxAge;
      }
      if (options.domain) {
        if (!domainValueRegExp.test(options.domain)) {
          throw new TypeError(`option domain is invalid: ${options.domain}`);
        }
        str += "; Domain=" + options.domain;
      }
      if (options.path) {
        if (!pathValueRegExp.test(options.path)) {
          throw new TypeError(`option path is invalid: ${options.path}`);
        }
        str += "; Path=" + options.path;
      }
      if (options.expires) {
        if (!isDate(options.expires) || !Number.isFinite(options.expires.valueOf())) {
          throw new TypeError(`option expires is invalid: ${options.expires}`);
        }
        str += "; Expires=" + options.expires.toUTCString();
      }
      if (options.httpOnly) {
        str += "; HttpOnly";
      }
      if (options.secure) {
        str += "; Secure";
      }
      if (options.partitioned) {
        str += "; Partitioned";
      }
      if (options.priority) {
        const priority = typeof options.priority === "string" ? options.priority.toLowerCase() : void 0;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError(`option priority is invalid: ${options.priority}`);
        }
      }
      if (options.sameSite) {
        const sameSite = typeof options.sameSite === "string" ? options.sameSite.toLowerCase() : options.sameSite;
        switch (sameSite) {
          case true:
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError(`option sameSite is invalid: ${options.sameSite}`);
        }
      }
      return str;
    }
    function decode(str) {
      if (str.indexOf("%") === -1)
        return str;
      try {
        return decodeURIComponent(str);
      } catch (e) {
        return str;
      }
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]";
    }
  }
});

// node_modules/@opennextjs/aws/dist/http/util.js
function parseSetCookieHeader(cookies) {
  if (!cookies) {
    return [];
  }
  if (typeof cookies === "string") {
    return cookies.split(/(?<!Expires=\w+),/i).map((c) => c.trim());
  }
  return cookies;
}
function getQueryFromIterator(it) {
  const query = {};
  for (const [key, value] of it) {
    if (key in query) {
      if (Array.isArray(query[key])) {
        query[key].push(value);
      } else {
        query[key] = [query[key], value];
      }
    } else {
      query[key] = value;
    }
  }
  return query;
}
var init_util = __esm({
  "node_modules/@opennextjs/aws/dist/http/util.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/utils.js
function getQueryFromSearchParams(searchParams) {
  return getQueryFromIterator(searchParams.entries());
}
var init_utils = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/utils.js"() {
    init_util();
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/edge.js
var edge_exports = {};
__export(edge_exports, {
  default: () => edge_default
});
import { Buffer as Buffer2 } from "node:buffer";
var import_cookie, NULL_BODY_STATUSES, converter, edge_default;
var init_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/edge.js"() {
    import_cookie = __toESM(require_dist(), 1);
    init_util();
    init_utils();
    NULL_BODY_STATUSES = /* @__PURE__ */ new Set([101, 103, 204, 205, 304]);
    converter = {
      convertFrom: async (event) => {
        const url = new URL(event.url);
        const searchParams = url.searchParams;
        const query = getQueryFromSearchParams(searchParams);
        const body = await event.arrayBuffer();
        const headers = {};
        event.headers.forEach((value, key) => {
          headers[key] = value;
        });
        const rawPath = url.pathname;
        const method = event.method;
        const shouldHaveBody = method !== "GET" && method !== "HEAD";
        const cookieHeader = event.headers.get("cookie");
        const cookies = cookieHeader ? import_cookie.default.parse(cookieHeader) : {};
        return {
          type: "core",
          method,
          rawPath,
          url: event.url,
          body: shouldHaveBody ? Buffer2.from(body) : void 0,
          headers,
          remoteAddress: event.headers.get("x-forwarded-for") ?? "::1",
          query,
          cookies
        };
      },
      convertTo: async (result) => {
        if ("internalEvent" in result) {
          const request = new Request(result.internalEvent.url, {
            body: result.internalEvent.body,
            method: result.internalEvent.method,
            headers: {
              ...result.internalEvent.headers,
              "x-forwarded-host": result.internalEvent.headers.host
            }
          });
          if (globalThis.__dangerous_ON_edge_converter_returns_request === true) {
            return request;
          }
          const cfCache = (result.isISR || result.internalEvent.rawPath.startsWith("/_next/image")) && process.env.DISABLE_CACHE !== "true" ? { cacheEverything: true } : {};
          return fetch(request, {
            // This is a hack to make sure that the response is cached by Cloudflare
            // See https://developers.cloudflare.com/workers/examples/cache-using-fetch/#caching-html-resources
            // @ts-expect-error - This is a Cloudflare specific option
            cf: cfCache
          });
        }
        const headers = new Headers();
        for (const [key, value] of Object.entries(result.headers)) {
          if (key === "set-cookie" && typeof value === "string") {
            const cookies = parseSetCookieHeader(value);
            for (const cookie of cookies) {
              headers.append(key, cookie);
            }
            continue;
          }
          if (Array.isArray(value)) {
            for (const v of value) {
              headers.append(key, v);
            }
          } else {
            headers.set(key, value);
          }
        }
        const body = NULL_BODY_STATUSES.has(result.statusCode) ? null : result.body;
        return new Response(body, {
          status: result.statusCode,
          headers
        });
      },
      name: "edge"
    };
    edge_default = converter;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js
var cloudflare_edge_exports = {};
__export(cloudflare_edge_exports, {
  default: () => cloudflare_edge_default
});
var cfPropNameMapping, handler, cloudflare_edge_default;
var init_cloudflare_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js"() {
    cfPropNameMapping = {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: [encodeURIComponent, "x-open-next-city"],
      country: "x-open-next-country",
      regionCode: "x-open-next-region",
      latitude: "x-open-next-latitude",
      longitude: "x-open-next-longitude"
    };
    handler = async (handler3, converter2) => async (request, env, ctx) => {
      globalThis.process = process;
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === "string") {
          process.env[key] = value;
        }
      }
      const internalEvent = await converter2.convertFrom(request);
      const cfProperties = request.cf;
      for (const [propName, mapping] of Object.entries(cfPropNameMapping)) {
        const propValue = cfProperties?.[propName];
        if (propValue != null) {
          const [encode, headerName] = Array.isArray(mapping) ? mapping : [null, mapping];
          internalEvent.headers[headerName] = encode ? encode(propValue) : propValue;
        }
      }
      const response = await handler3(internalEvent, {
        waitUntil: ctx.waitUntil.bind(ctx)
      });
      const result = await converter2.convertTo(response);
      return result;
    };
    cloudflare_edge_default = {
      wrapper: handler,
      name: "cloudflare-edge",
      supportStreaming: true,
      edgeRuntime: true
    };
  }
});

// node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js
var pattern_env_exports = {};
__export(pattern_env_exports, {
  default: () => pattern_env_default
});
var envLoader, pattern_env_default;
var init_pattern_env = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js"() {
    init_logger();
    envLoader = {
      name: "env",
      resolve: async (_path) => {
        try {
          const origin = JSON.parse(process.env.OPEN_NEXT_ORIGIN ?? "{}");
          for (const [key, value] of Object.entries(globalThis.openNextConfig.functions ?? {}).filter(([key2]) => key2 !== "default")) {
            if (value.patterns.some((pattern) => {
              return new RegExp(
                // transform glob pattern to regex
                `/${pattern.replace(/\*\*/g, "(.*)").replace(/\*/g, "([^/]*)").replace(/\//g, "\\/").replace(/\?/g, ".")}`
              ).test(_path);
            })) {
              debug("Using origin", key, value.patterns);
              return origin[key];
            }
          }
          if (_path.startsWith("/_next/image") && origin.imageOptimizer) {
            debug("Using origin", "imageOptimizer", _path);
            return origin.imageOptimizer;
          }
          if (origin.default) {
            debug("Using default origin", origin.default, _path);
            return origin.default;
          }
          return false;
        } catch (e) {
          error("Error while resolving origin", e);
          return false;
        }
      }
    };
    pattern_env_default = envLoader;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js
var dummy_exports = {};
__export(dummy_exports, {
  default: () => dummy_default
});
var resolver, dummy_default;
var init_dummy = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js"() {
    resolver = {
      name: "dummy"
    };
    dummy_default = resolver;
  }
});

// node_modules/@opennextjs/aws/dist/utils/stream.js
import { Readable } from "node:stream";
function toReadableStream(value, isBase64) {
  return Readable.toWeb(Readable.from(Buffer.from(value, isBase64 ? "base64" : "utf8")));
}
function emptyReadableStream() {
  if (process.env.OPEN_NEXT_FORCE_NON_EMPTY_RESPONSE === "true") {
    return Readable.toWeb(Readable.from([Buffer.from("SOMETHING")]));
  }
  return Readable.toWeb(Readable.from([]));
}
var init_stream = __esm({
  "node_modules/@opennextjs/aws/dist/utils/stream.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js
var fetch_exports = {};
__export(fetch_exports, {
  default: () => fetch_default
});
var fetchProxy, fetch_default;
var init_fetch = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js"() {
    init_stream();
    fetchProxy = {
      name: "fetch-proxy",
      // @ts-ignore
      proxy: async (internalEvent) => {
        const { url, headers: eventHeaders, method, body } = internalEvent;
        const headers = Object.fromEntries(Object.entries(eventHeaders).filter(([key]) => key.toLowerCase() !== "cf-connecting-ip"));
        const response = await fetch(url, {
          method,
          headers,
          body
        });
        const responseHeaders = {};
        response.headers.forEach((value, key) => {
          responseHeaders[key] = value;
        });
        return {
          type: "core",
          headers: responseHeaders,
          statusCode: response.status,
          isBase64Encoded: true,
          body: response.body ?? emptyReadableStream()
        };
      }
    };
    fetch_default = fetchProxy;
  }
});

// .next/server/edge/chunks/_9dc8116b._.js
var require_dc8116b = __commonJS({
  ".next/server/edge/chunks/_9dc8116b._.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/_9dc8116b._.js", 347, (e) => {
      e.v(JSON.parse('{"name":"next","version":"15.5.2","description":"The React Framework","main":"./dist/server/next.js","license":"MIT","repository":"vercel/next.js","bugs":"https://github.com/vercel/next.js/issues","homepage":"https://nextjs.org","types":"index.d.ts","files":["dist","app.js","app.d.ts","babel.js","babel.d.ts","client.js","client.d.ts","compat","cache.js","cache.d.ts","config.js","config.d.ts","constants.js","constants.d.ts","document.js","document.d.ts","dynamic.js","dynamic.d.ts","error.js","error.d.ts","future","legacy","script.js","script.d.ts","server.js","server.d.ts","head.js","head.d.ts","image.js","image.d.ts","link.js","link.d.ts","form.js","form.d.ts","router.js","router.d.ts","jest.js","jest.d.ts","amp.js","amp.d.ts","og.js","og.d.ts","root-params.js","root-params.d.ts","types.d.ts","types.js","index.d.ts","types/global.d.ts","types/compiled.d.ts","image-types/global.d.ts","navigation-types/navigation.d.ts","navigation-types/compat/navigation.d.ts","font","navigation.js","navigation.d.ts","headers.js","headers.d.ts","navigation-types","web-vitals.js","web-vitals.d.ts","experimental/testing/server.js","experimental/testing/server.d.ts","experimental/testmode/playwright.js","experimental/testmode/playwright.d.ts","experimental/testmode/playwright/msw.js","experimental/testmode/playwright/msw.d.ts","experimental/testmode/proxy.js","experimental/testmode/proxy.d.ts"],"bin":{"next":"./dist/bin/next"},"scripts":{"dev":"cross-env NEXT_SERVER_NO_MANGLE=1 taskr","release":"taskr release","build":"pnpm release","prepublishOnly":"cd ../../ && turbo run build","types":"tsc --project tsconfig.build.json --declaration --emitDeclarationOnly --stripInternal --declarationDir dist","typescript":"tsec --noEmit","ncc-compiled":"taskr ncc","storybook":"BROWSER=none storybook dev -p 6006","build-storybook":"storybook build","test-storybook":"test-storybook"},"taskr":{"requires":["./taskfile-webpack.js","./taskfile-ncc.js","./taskfile-swc.js","./taskfile-watch.js"]},"dependencies":{"@next/env":"15.5.2","@swc/helpers":"0.5.15","caniuse-lite":"^1.0.30001579","postcss":"8.4.31","styled-jsx":"5.1.6"},"peerDependencies":{"@opentelemetry/api":"^1.1.0","@playwright/test":"^1.51.1","babel-plugin-react-compiler":"*","react":"^18.2.0 || 19.0.0-rc-de68d2f4-20241204 || ^19.0.0","react-dom":"^18.2.0 || 19.0.0-rc-de68d2f4-20241204 || ^19.0.0","sass":"^1.3.0"},"peerDependenciesMeta":{"babel-plugin-react-compiler":{"optional":true},"sass":{"optional":true},"@opentelemetry/api":{"optional":true},"@playwright/test":{"optional":true}},"optionalDependencies":{"sharp":"^0.34.3","@next/swc-darwin-arm64":"15.5.2","@next/swc-darwin-x64":"15.5.2","@next/swc-linux-arm64-gnu":"15.5.2","@next/swc-linux-arm64-musl":"15.5.2","@next/swc-linux-x64-gnu":"15.5.2","@next/swc-linux-x64-musl":"15.5.2","@next/swc-win32-arm64-msvc":"15.5.2","@next/swc-win32-x64-msvc":"15.5.2"},"devDependencies":{"@ampproject/toolbox-optimizer":"2.8.3","@babel/code-frame":"7.26.2","@babel/core":"7.26.10","@babel/eslint-parser":"7.24.6","@babel/generator":"7.27.0","@babel/plugin-syntax-bigint":"7.8.3","@babel/plugin-syntax-dynamic-import":"7.8.3","@babel/plugin-syntax-import-attributes":"7.26.0","@babel/plugin-syntax-jsx":"7.25.9","@babel/plugin-syntax-typescript":"7.25.4","@babel/plugin-transform-class-properties":"7.25.9","@babel/plugin-transform-export-namespace-from":"7.25.9","@babel/plugin-transform-modules-commonjs":"7.26.3","@babel/plugin-transform-numeric-separator":"7.25.9","@babel/plugin-transform-object-rest-spread":"7.25.9","@babel/plugin-transform-runtime":"7.26.10","@babel/preset-env":"7.26.9","@babel/preset-react":"7.26.3","@babel/preset-typescript":"7.27.0","@babel/runtime":"7.27.0","@babel/traverse":"7.27.0","@babel/types":"7.27.0","@base-ui-components/react":"1.0.0-beta.2","@capsizecss/metrics":"3.4.0","@edge-runtime/cookies":"6.0.0","@edge-runtime/ponyfill":"4.0.0","@edge-runtime/primitives":"6.0.0","@hapi/accept":"5.0.2","@jest/transform":"29.5.0","@jest/types":"29.5.0","@mswjs/interceptors":"0.23.0","@napi-rs/triples":"1.2.0","@next/font":"15.5.2","@next/polyfill-module":"15.5.2","@next/polyfill-nomodule":"15.5.2","@next/react-refresh-utils":"15.5.2","@next/swc":"15.5.2","@opentelemetry/api":"1.6.0","@playwright/test":"1.51.1","@rspack/core":"1.4.5","@storybook/addon-a11y":"8.6.0","@storybook/addon-essentials":"8.6.0","@storybook/addon-interactions":"8.6.0","@storybook/addon-webpack5-compiler-swc":"3.0.0","@storybook/blocks":"8.6.0","@storybook/react":"8.6.0","@storybook/react-webpack5":"8.6.0","@storybook/test":"8.6.0","@storybook/test-runner":"0.21.0","@swc/core":"1.11.24","@swc/types":"0.1.7","@taskr/clear":"1.1.0","@taskr/esnext":"1.1.0","@types/amphtml-validator":"1.0.0","@types/babel__code-frame":"7.0.6","@types/babel__core":"7.20.5","@types/babel__generator":"7.27.0","@types/babel__template":"7.4.4","@types/babel__traverse":"7.20.7","@types/bytes":"3.1.1","@types/ci-info":"2.0.0","@types/compression":"0.0.36","@types/content-disposition":"0.5.4","@types/content-type":"1.1.3","@types/cookie":"0.3.3","@types/cross-spawn":"6.0.0","@types/debug":"4.1.5","@types/express-serve-static-core":"4.17.33","@types/fresh":"0.5.0","@types/glob":"7.1.1","@types/jsonwebtoken":"9.0.0","@types/lodash":"4.14.198","@types/lodash.curry":"4.1.6","@types/path-to-regexp":"1.7.0","@types/picomatch":"2.3.3","@types/platform":"1.3.4","@types/react":"19.0.8","@types/react-dom":"19.0.3","@types/react-is":"18.2.4","@types/semver":"7.3.1","@types/send":"0.14.4","@types/shell-quote":"1.7.1","@types/tar":"6.1.5","@types/text-table":"0.2.1","@types/ua-parser-js":"0.7.36","@types/webpack-sources1":"npm:@types/webpack-sources@0.1.5","@types/ws":"8.2.0","@vercel/ncc":"0.34.0","@vercel/nft":"0.27.1","@vercel/turbopack-ecmascript-runtime":"*","acorn":"8.14.0","amphtml-validator":"1.0.38","anser":"1.4.9","arg":"4.1.0","assert":"2.0.0","async-retry":"1.2.3","async-sema":"3.0.0","axe-playwright":"2.0.3","babel-loader":"10.0.0","babel-plugin-react-compiler":"19.1.0-rc.2","babel-plugin-transform-define":"2.0.0","babel-plugin-transform-react-remove-prop-types":"0.4.24","browserify-zlib":"0.2.0","browserslist":"4.24.4","buffer":"5.6.0","busboy":"1.6.0","bytes":"3.1.1","ci-info":"watson/ci-info#f43f6a1cefff47fb361c88cf4b943fdbcaafe540","cli-select":"1.1.2","client-only":"0.0.1","commander":"12.1.0","comment-json":"3.0.3","compression":"1.7.4","conf":"5.0.0","constants-browserify":"1.0.0","content-disposition":"0.5.3","content-type":"1.0.4","cookie":"0.4.1","cross-env":"6.0.3","cross-spawn":"7.0.3","crypto-browserify":"3.12.0","css-loader":"7.1.2","css.escape":"1.5.1","cssnano-preset-default":"7.0.6","data-uri-to-buffer":"3.0.1","debug":"4.1.1","devalue":"2.0.1","domain-browser":"4.19.0","edge-runtime":"4.0.1","events":"3.3.0","find-up":"4.1.0","fresh":"0.5.2","glob":"7.1.7","gzip-size":"5.1.1","http-proxy":"1.18.1","http-proxy-agent":"5.0.0","https-browserify":"1.0.0","https-proxy-agent":"5.0.1","icss-utils":"5.1.0","ignore-loader":"0.1.2","image-size":"1.2.1","is-docker":"2.0.0","is-wsl":"2.2.0","jest-worker":"27.5.1","json5":"2.2.3","jsonwebtoken":"9.0.0","loader-runner":"4.3.0","loader-utils2":"npm:loader-utils@2.0.4","loader-utils3":"npm:loader-utils@3.1.3","lodash.curry":"4.1.1","mini-css-extract-plugin":"2.4.4","msw":"2.3.0","nanoid":"3.1.32","native-url":"0.3.4","neo-async":"2.6.1","node-html-parser":"5.3.3","ora":"4.0.4","os-browserify":"0.3.0","p-limit":"3.1.0","p-queue":"6.6.2","path-browserify":"1.0.1","path-to-regexp":"6.3.0","picomatch":"4.0.1","postcss-flexbugs-fixes":"5.0.2","postcss-modules-extract-imports":"3.0.0","postcss-modules-local-by-default":"4.2.0","postcss-modules-scope":"3.0.0","postcss-modules-values":"4.0.0","postcss-preset-env":"7.4.3","postcss-safe-parser":"6.0.0","postcss-scss":"4.0.3","postcss-value-parser":"4.2.0","process":"0.11.10","punycode":"2.1.1","querystring-es3":"0.2.1","raw-body":"2.4.1","react-refresh":"0.12.0","recast":"0.23.11","regenerator-runtime":"0.13.4","safe-stable-stringify":"2.5.0","sass-loader":"15.0.0","schema-utils2":"npm:schema-utils@2.7.1","schema-utils3":"npm:schema-utils@3.0.0","semver":"7.3.2","send":"0.18.0","server-only":"0.0.1","setimmediate":"1.0.5","shell-quote":"1.7.3","source-map":"0.6.1","source-map-loader":"5.0.0","source-map08":"npm:source-map@0.8.0-beta.0","stacktrace-parser":"0.1.10","storybook":"8.6.0","stream-browserify":"3.0.0","stream-http":"3.1.1","strict-event-emitter":"0.5.0","string-hash":"1.1.3","string_decoder":"1.3.0","strip-ansi":"6.0.0","style-loader":"4.0.0","superstruct":"1.0.3","tar":"6.1.15","taskr":"1.1.0","terser":"5.27.0","terser-webpack-plugin":"5.3.9","text-table":"0.2.0","timers-browserify":"2.0.12","tty-browserify":"0.0.1","typescript":"5.8.2","ua-parser-js":"1.0.35","unistore":"3.4.1","util":"0.12.4","vm-browserify":"1.1.2","watchpack":"2.4.0","web-vitals":"4.2.1","webpack":"5.98.0","webpack-sources1":"npm:webpack-sources@1.4.3","webpack-sources3":"npm:webpack-sources@3.2.3","ws":"8.2.3","zod":"3.25.76","zod-validation-error":"3.4.0"},"keywords":["react","framework","nextjs","web","server","node","front-end","backend","cli","vercel"],"engines":{"node":"^18.18.0 || ^19.8.0 || >= 20.0.0"}}'));
    }, 32442, (e, s, t) => {
      self._ENTRIES ||= {};
      let r = Promise.resolve().then(() => e.i(42738));
      r.catch(() => {
      }), self._ENTRIES.middleware_middleware = new Proxy(r, { get(e2, s2) {
        if ("then" === s2) return (s3, t3) => e2.then(s3, t3);
        let t2 = (...t3) => e2.then((e3) => (0, e3[s2])(...t3));
        return t2.then = (t3, r2) => e2.then((e3) => e3[s2]).then(t3, r2), t2;
      } });
    }]);
  }
});

// .next/server/edge/chunks/node_modules_next_dist_esm_api_headers_95aeb203.js
var require_node_modules_next_dist_esm_api_headers_95aeb203 = __commonJS({
  ".next/server/edge/chunks/node_modules_next_dist_esm_api_headers_95aeb203.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/node_modules_next_dist_esm_api_headers_95aeb203.js", 40415, (e) => {
      "use strict";
      e.s(["cookies", () => g, "draftMode", () => k, "headers", () => v], 40415), e.s([], 11189), e.s(["cookies", () => g], 94447);
      var r = e.i(53065);
      e.i(39e3);
      var t = e.i(28042);
      e.i(7754);
      var a = e.i(90460), n = e.i(53835), i = e.i(82453), o = e.i(63072), s = e.i(80082), c = e.i(51564), u = e.i(40049);
      let d = { current: null }, l = "function" == typeof u.cache ? u.cache : (e2) => e2, h = console.warn;
      function f(e2) {
        return function(...r2) {
          h(e2(...r2));
        };
      }
      l((e2) => {
        try {
          h(d.current);
        } finally {
          d.current = null;
        }
      });
      var p = e.i(65179), b = e.i(25753);
      function g() {
        let e2 = "cookies", u2 = a.workAsyncStorage.getStore(), d2 = i.workUnitAsyncStorage.getStore();
        if (u2) {
          if (d2 && "after" === d2.phase && !(0, p.isRequestAPICallableInsideAfter)()) throw Object.defineProperty(Error(`Route ${u2.route} used "cookies" inside "after(...)". This is not supported. If you need this data inside an "after" callback, use "cookies" outside of the callback. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", { value: "E88", enumerable: false, configurable: true });
          if (u2.forceStatic) return E(r.RequestCookiesAdapter.seal(new t.RequestCookies(new Headers({}))));
          if (u2.dynamicShouldError) throw Object.defineProperty(new s.StaticGenBailoutError(`Route ${u2.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`cookies\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", { value: "E549", enumerable: false, configurable: true });
          if (d2) switch (d2.type) {
            case "cache":
              let a2 = Object.defineProperty(Error(`Route ${u2.route} used "cookies" inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "cookies" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", { value: "E398", enumerable: false, configurable: true });
              throw Error.captureStackTrace(a2, g), u2.invalidDynamicUsageError ??= a2, a2;
            case "unstable-cache":
              throw Object.defineProperty(Error(`Route ${u2.route} used "cookies" inside a function cached with "unstable_cache(...)". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "cookies" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", { value: "E157", enumerable: false, configurable: true });
            case "prerender":
              var l2 = u2, h2 = d2;
              let n2 = m.get(h2);
              if (n2) return n2;
              let i2 = (0, c.makeHangingPromise)(h2.renderSignal, l2.route, "`cookies()`");
              return m.set(h2, i2), i2;
            case "prerender-client":
              let f2 = "`cookies`";
              throw Object.defineProperty(new b.InvariantError(`${f2} must not be used within a client component. Next.js should be preventing ${f2} from being included in client components statically, but did not in this case.`), "__NEXT_ERROR_CODE", { value: "E693", enumerable: false, configurable: true });
            case "prerender-ppr":
              return (0, o.postponeWithTracking)(u2.route, e2, d2.dynamicTracking);
            case "prerender-legacy":
              return (0, o.throwToInterruptStaticGeneration)(e2, u2, d2);
            case "prerender-runtime":
              return (0, o.delayUntilRuntimeStage)(d2, function(e3) {
                let r2 = m.get(e3);
                if (r2) return r2;
                let t2 = Promise.resolve(e3);
                return m.set(e3, t2), t2;
              }(d2.cookies));
            case "private-cache":
              return E(d2.cookies);
            case "request":
              return (0, o.trackDynamicDataInDynamicRender)(d2), E((0, r.areCookiesMutableInCurrentPhase)(d2) ? d2.userspaceMutableCookies : d2.cookies);
          }
        }
        (0, n.throwForMissingRequestStore)(e2);
      }
      e.i(17536);
      let m = /* @__PURE__ */ new WeakMap();
      function E(e2) {
        let r2 = m.get(e2);
        if (r2) return r2;
        let t2 = Promise.resolve(e2);
        return m.set(e2, t2), Object.defineProperties(t2, { [Symbol.iterator]: { value: e2[Symbol.iterator] ? e2[Symbol.iterator].bind(e2) : y.bind(e2) }, size: { get: () => e2.size }, get: { value: e2.get.bind(e2) }, getAll: { value: e2.getAll.bind(e2) }, has: { value: e2.has.bind(e2) }, set: { value: e2.set.bind(e2) }, delete: { value: e2.delete.bind(e2) }, clear: { value: "function" == typeof e2.clear ? e2.clear.bind(e2) : _.bind(e2, t2) }, toString: { value: e2.toString.bind(e2) } }), t2;
      }
      function y() {
        return this.getAll().map((e2) => [e2.name, e2]).values();
      }
      function _(e2) {
        for (let e3 of this.getAll()) this.delete(e3.name);
        return e2;
      }
      f(function(e2, r2) {
        let t2 = e2 ? `Route "${e2}" ` : "This route ";
        return Object.defineProperty(Error(`${t2}used ${r2}. \`cookies()\` should be awaited before using its value. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", { value: "E223", enumerable: false, configurable: true });
      }), e.s(["headers", () => v], 28620);
      var R = e.i(48047);
      function v() {
        let e2 = "headers", r2 = a.workAsyncStorage.getStore(), t2 = i.workUnitAsyncStorage.getStore();
        if (r2) {
          if (t2 && "after" === t2.phase && !(0, p.isRequestAPICallableInsideAfter)()) throw Object.defineProperty(Error(`Route ${r2.route} used "headers" inside "after(...)". This is not supported. If you need this data inside an "after" callback, use "headers" outside of the callback. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", { value: "E367", enumerable: false, configurable: true });
          if (r2.forceStatic) return w(R.HeadersAdapter.seal(new Headers({})));
          if (t2) switch (t2.type) {
            case "cache": {
              let e3 = Object.defineProperty(Error(`Route ${r2.route} used "headers" inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "headers" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", { value: "E304", enumerable: false, configurable: true });
              throw Error.captureStackTrace(e3, v), r2.invalidDynamicUsageError ??= e3, e3;
            }
            case "private-cache": {
              let e3 = Object.defineProperty(Error(`Route ${r2.route} used "headers" inside "use cache: private". Accessing "headers" inside a private cache scope is not supported. If you need this data inside a cached function use "headers" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", { value: "E742", enumerable: false, configurable: true });
              throw Error.captureStackTrace(e3, v), r2.invalidDynamicUsageError ??= e3, e3;
            }
            case "unstable-cache":
              throw Object.defineProperty(Error(`Route ${r2.route} used "headers" inside a function cached with "unstable_cache(...)". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "headers" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", { value: "E127", enumerable: false, configurable: true });
          }
          if (r2.dynamicShouldError) throw Object.defineProperty(new s.StaticGenBailoutError(`Route ${r2.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`headers\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", { value: "E525", enumerable: false, configurable: true });
          if (t2) switch (t2.type) {
            case "prerender":
            case "prerender-runtime":
              var u2 = r2, d2 = t2;
              let a2 = O.get(d2);
              if (a2) return a2;
              let n2 = (0, c.makeHangingPromise)(d2.renderSignal, u2.route, "`headers()`");
              return O.set(d2, n2), n2;
            case "prerender-client":
              let i2 = "`headers`";
              throw Object.defineProperty(new b.InvariantError(`${i2} must not be used within a client component. Next.js should be preventing ${i2} from being included in client components statically, but did not in this case.`), "__NEXT_ERROR_CODE", { value: "E693", enumerable: false, configurable: true });
            case "prerender-ppr":
              return (0, o.postponeWithTracking)(r2.route, e2, t2.dynamicTracking);
            case "prerender-legacy":
              return (0, o.throwToInterruptStaticGeneration)(e2, r2, t2);
            case "request":
              return (0, o.trackDynamicDataInDynamicRender)(t2), w(t2.headers);
          }
        }
        (0, n.throwForMissingRequestStore)(e2);
      }
      let O = /* @__PURE__ */ new WeakMap();
      function w(e2) {
        let r2 = O.get(e2);
        if (r2) return r2;
        let t2 = Promise.resolve(e2);
        return O.set(e2, t2), Object.defineProperties(t2, { append: { value: e2.append.bind(e2) }, delete: { value: e2.delete.bind(e2) }, get: { value: e2.get.bind(e2) }, has: { value: e2.has.bind(e2) }, set: { value: e2.set.bind(e2) }, getSetCookie: { value: e2.getSetCookie.bind(e2) }, forEach: { value: e2.forEach.bind(e2) }, keys: { value: e2.keys.bind(e2) }, values: { value: e2.values.bind(e2) }, entries: { value: e2.entries.bind(e2) }, [Symbol.iterator]: { value: e2[Symbol.iterator].bind(e2) } }), t2;
      }
      f(function(e2, r2) {
        let t2 = e2 ? `Route "${e2}" ` : "This route ";
        return Object.defineProperty(Error(`${t2}used ${r2}. \`headers()\` should be awaited before using its value. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", { value: "E277", enumerable: false, configurable: true });
      }), e.s(["draftMode", () => k], 99304);
      var S = e.i(18368);
      function k() {
        let e2 = a.workAsyncStorage.getStore(), r2 = i.workUnitAsyncStorage.getStore();
        switch ((!e2 || !r2) && (0, n.throwForMissingRequestStore)("draftMode"), r2.type) {
          case "prerender-runtime":
            return (0, o.delayUntilRuntimeStage)(r2, j(r2.draftMode, e2));
          case "request":
            return j(r2.draftMode, e2);
          case "cache":
          case "private-cache":
          case "unstable-cache":
            let t2 = (0, n.getDraftModeProviderForCacheScope)(e2, r2);
            if (t2) return j(t2, e2);
          case "prerender":
          case "prerender-client":
          case "prerender-ppr":
          case "prerender-legacy":
            return j(null, e2);
          default:
            return r2;
        }
      }
      function j(e2, r2) {
        let t2, a2 = e2 ?? T, n2 = D.get(a2);
        return n2 || (t2 = function(e3) {
          let r3 = new P(e3), t3 = Promise.resolve(r3);
          return Object.defineProperty(t3, "isEnabled", { get: () => r3.isEnabled, enumerable: true, configurable: true }), t3.enable = r3.enable.bind(r3), t3.disable = r3.disable.bind(r3), t3;
        }(e2), D.set(a2, t2), t2);
      }
      let T = {}, D = /* @__PURE__ */ new WeakMap();
      class P {
        constructor(e2) {
          this._provider = e2;
        }
        get isEnabled() {
          return null !== this._provider && this._provider.isEnabled;
        }
        enable() {
          $("draftMode().enable()", this.enable), null !== this._provider && this._provider.enable();
        }
        disable() {
          $("draftMode().disable()", this.disable), null !== this._provider && this._provider.disable();
        }
      }
      function $(e2, r2) {
        let t2 = a.workAsyncStorage.getStore(), n2 = i.workUnitAsyncStorage.getStore();
        if (t2) {
          if ((null == n2 ? void 0 : n2.phase) === "after") throw Object.defineProperty(Error(`Route ${t2.route} used "${e2}" inside \`after\`. The enabled status of draftMode can be read inside \`after\` but you cannot enable or disable draftMode. See more info here: https://nextjs.org/docs/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", { value: "E348", enumerable: false, configurable: true });
          if (t2.dynamicShouldError) throw Object.defineProperty(new s.StaticGenBailoutError(`Route ${t2.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${e2}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", { value: "E553", enumerable: false, configurable: true });
          if (n2) switch (n2.type) {
            case "cache":
            case "private-cache": {
              let a3 = Object.defineProperty(Error(`Route ${t2.route} used "${e2}" inside "use cache". The enabled status of draftMode can be read in caches but you must not enable or disable draftMode inside a cache. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", { value: "E246", enumerable: false, configurable: true });
              throw Error.captureStackTrace(a3, r2), t2.invalidDynamicUsageError ??= a3, a3;
            }
            case "unstable-cache":
              throw Object.defineProperty(Error(`Route ${t2.route} used "${e2}" inside a function cached with "unstable_cache(...)". The enabled status of draftMode can be read in caches but you must not enable or disable draftMode inside a cache. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", { value: "E259", enumerable: false, configurable: true });
            case "prerender":
            case "prerender-runtime": {
              let r3 = Object.defineProperty(Error(`Route ${t2.route} used ${e2} without first calling \`await connection()\`. See more info here: https://nextjs.org/docs/messages/next-prerender-sync-headers`), "__NEXT_ERROR_CODE", { value: "E126", enumerable: false, configurable: true });
              return (0, o.abortAndThrowOnSynchronousRequestDataAccess)(t2.route, e2, r3, n2);
            }
            case "prerender-client":
              let a2 = "`draftMode`";
              throw Object.defineProperty(new b.InvariantError(`${a2} must not be used within a client component. Next.js should be preventing ${a2} from being included in client components statically, but did not in this case.`), "__NEXT_ERROR_CODE", { value: "E693", enumerable: false, configurable: true });
            case "prerender-ppr":
              return (0, o.postponeWithTracking)(t2.route, e2, n2.dynamicTracking);
            case "prerender-legacy":
              n2.revalidate = 0;
              let i2 = Object.defineProperty(new S.DynamicServerError(`Route ${t2.route} couldn't be rendered statically because it used \`${e2}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", { value: "E558", enumerable: false, configurable: true });
              throw t2.dynamicUsageDescription = e2, t2.dynamicUsageStack = i2.stack, i2;
            case "request":
              (0, o.trackDynamicDataInDynamicRender)(n2);
          }
        }
      }
      f(function(e2, r2) {
        let t2 = e2 ? `Route "${e2}" ` : "This route ";
        return Object.defineProperty(Error(`${t2}used ${r2}. \`draftMode()\` should be awaited before using its value. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", { value: "E377", enumerable: false, configurable: true });
      }), e.i(11189), e.i(94447), e.i(28620), e.i(99304);
    }]);
  }
});

// node-built-in-modules:node:buffer
var node_buffer_exports = {};
import * as node_buffer_star from "node:buffer";
var init_node_buffer = __esm({
  "node-built-in-modules:node:buffer"() {
    __reExport(node_buffer_exports, node_buffer_star);
  }
});

// node-built-in-modules:node:async_hooks
var node_async_hooks_exports = {};
import * as node_async_hooks_star from "node:async_hooks";
var init_node_async_hooks = __esm({
  "node-built-in-modules:node:async_hooks"() {
    __reExport(node_async_hooks_exports, node_async_hooks_star);
  }
});

// .next/server/edge/chunks/[root-of-the-server]__f0c622ec._.js
var require_root_of_the_server_f0c622ec = __commonJS({
  ".next/server/edge/chunks/[root-of-the-server]__f0c622ec._.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__f0c622ec._.js", 59110, (e, t, r) => {
      (() => {
        "use strict";
        var r2 = { 491: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ContextAPI = void 0;
          let i2 = r3(223), n2 = r3(172), s2 = r3(930), a = "context", o = new i2.NoopContextManager();
          class l {
            constructor() {
            }
            static getInstance() {
              return this._instance || (this._instance = new l()), this._instance;
            }
            setGlobalContextManager(e3) {
              return (0, n2.registerGlobal)(a, e3, s2.DiagAPI.instance());
            }
            active() {
              return this._getContextManager().active();
            }
            with(e3, t3, r4, ...i3) {
              return this._getContextManager().with(e3, t3, r4, ...i3);
            }
            bind(e3, t3) {
              return this._getContextManager().bind(e3, t3);
            }
            _getContextManager() {
              return (0, n2.getGlobal)(a) || o;
            }
            disable() {
              this._getContextManager().disable(), (0, n2.unregisterGlobal)(a, s2.DiagAPI.instance());
            }
          }
          t2.ContextAPI = l;
        }, 930: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagAPI = void 0;
          let i2 = r3(56), n2 = r3(912), s2 = r3(957), a = r3(172);
          class o {
            constructor() {
              function e3(e4) {
                return function(...t4) {
                  let r4 = (0, a.getGlobal)("diag");
                  if (r4) return r4[e4](...t4);
                };
              }
              let t3 = this;
              t3.setLogger = (e4, r4 = { logLevel: s2.DiagLogLevel.INFO }) => {
                var i3, o2, l;
                if (e4 === t3) {
                  let e5 = Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                  return t3.error(null != (i3 = e5.stack) ? i3 : e5.message), false;
                }
                "number" == typeof r4 && (r4 = { logLevel: r4 });
                let c = (0, a.getGlobal)("diag"), u = (0, n2.createLogLevelDiagLogger)(null != (o2 = r4.logLevel) ? o2 : s2.DiagLogLevel.INFO, e4);
                if (c && !r4.suppressOverrideMessage) {
                  let e5 = null != (l = Error().stack) ? l : "<failed to generate stacktrace>";
                  c.warn(`Current logger will be overwritten from ${e5}`), u.warn(`Current logger will overwrite one already registered from ${e5}`);
                }
                return (0, a.registerGlobal)("diag", u, t3, true);
              }, t3.disable = () => {
                (0, a.unregisterGlobal)("diag", t3);
              }, t3.createComponentLogger = (e4) => new i2.DiagComponentLogger(e4), t3.verbose = e3("verbose"), t3.debug = e3("debug"), t3.info = e3("info"), t3.warn = e3("warn"), t3.error = e3("error");
            }
            static instance() {
              return this._instance || (this._instance = new o()), this._instance;
            }
          }
          t2.DiagAPI = o;
        }, 653: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.MetricsAPI = void 0;
          let i2 = r3(660), n2 = r3(172), s2 = r3(930), a = "metrics";
          class o {
            constructor() {
            }
            static getInstance() {
              return this._instance || (this._instance = new o()), this._instance;
            }
            setGlobalMeterProvider(e3) {
              return (0, n2.registerGlobal)(a, e3, s2.DiagAPI.instance());
            }
            getMeterProvider() {
              return (0, n2.getGlobal)(a) || i2.NOOP_METER_PROVIDER;
            }
            getMeter(e3, t3, r4) {
              return this.getMeterProvider().getMeter(e3, t3, r4);
            }
            disable() {
              (0, n2.unregisterGlobal)(a, s2.DiagAPI.instance());
            }
          }
          t2.MetricsAPI = o;
        }, 181: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.PropagationAPI = void 0;
          let i2 = r3(172), n2 = r3(874), s2 = r3(194), a = r3(277), o = r3(369), l = r3(930), c = "propagation", u = new n2.NoopTextMapPropagator();
          class d {
            constructor() {
              this.createBaggage = o.createBaggage, this.getBaggage = a.getBaggage, this.getActiveBaggage = a.getActiveBaggage, this.setBaggage = a.setBaggage, this.deleteBaggage = a.deleteBaggage;
            }
            static getInstance() {
              return this._instance || (this._instance = new d()), this._instance;
            }
            setGlobalPropagator(e3) {
              return (0, i2.registerGlobal)(c, e3, l.DiagAPI.instance());
            }
            inject(e3, t3, r4 = s2.defaultTextMapSetter) {
              return this._getGlobalPropagator().inject(e3, t3, r4);
            }
            extract(e3, t3, r4 = s2.defaultTextMapGetter) {
              return this._getGlobalPropagator().extract(e3, t3, r4);
            }
            fields() {
              return this._getGlobalPropagator().fields();
            }
            disable() {
              (0, i2.unregisterGlobal)(c, l.DiagAPI.instance());
            }
            _getGlobalPropagator() {
              return (0, i2.getGlobal)(c) || u;
            }
          }
          t2.PropagationAPI = d;
        }, 997: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceAPI = void 0;
          let i2 = r3(172), n2 = r3(846), s2 = r3(139), a = r3(607), o = r3(930), l = "trace";
          class c {
            constructor() {
              this._proxyTracerProvider = new n2.ProxyTracerProvider(), this.wrapSpanContext = s2.wrapSpanContext, this.isSpanContextValid = s2.isSpanContextValid, this.deleteSpan = a.deleteSpan, this.getSpan = a.getSpan, this.getActiveSpan = a.getActiveSpan, this.getSpanContext = a.getSpanContext, this.setSpan = a.setSpan, this.setSpanContext = a.setSpanContext;
            }
            static getInstance() {
              return this._instance || (this._instance = new c()), this._instance;
            }
            setGlobalTracerProvider(e3) {
              let t3 = (0, i2.registerGlobal)(l, this._proxyTracerProvider, o.DiagAPI.instance());
              return t3 && this._proxyTracerProvider.setDelegate(e3), t3;
            }
            getTracerProvider() {
              return (0, i2.getGlobal)(l) || this._proxyTracerProvider;
            }
            getTracer(e3, t3) {
              return this.getTracerProvider().getTracer(e3, t3);
            }
            disable() {
              (0, i2.unregisterGlobal)(l, o.DiagAPI.instance()), this._proxyTracerProvider = new n2.ProxyTracerProvider();
            }
          }
          t2.TraceAPI = c;
        }, 277: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.deleteBaggage = t2.setBaggage = t2.getActiveBaggage = t2.getBaggage = void 0;
          let i2 = r3(491), n2 = (0, r3(780).createContextKey)("OpenTelemetry Baggage Key");
          function s2(e3) {
            return e3.getValue(n2) || void 0;
          }
          t2.getBaggage = s2, t2.getActiveBaggage = function() {
            return s2(i2.ContextAPI.getInstance().active());
          }, t2.setBaggage = function(e3, t3) {
            return e3.setValue(n2, t3);
          }, t2.deleteBaggage = function(e3) {
            return e3.deleteValue(n2);
          };
        }, 993: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.BaggageImpl = void 0;
          class r3 {
            constructor(e3) {
              this._entries = e3 ? new Map(e3) : /* @__PURE__ */ new Map();
            }
            getEntry(e3) {
              let t3 = this._entries.get(e3);
              if (t3) return Object.assign({}, t3);
            }
            getAllEntries() {
              return Array.from(this._entries.entries()).map(([e3, t3]) => [e3, t3]);
            }
            setEntry(e3, t3) {
              let i2 = new r3(this._entries);
              return i2._entries.set(e3, t3), i2;
            }
            removeEntry(e3) {
              let t3 = new r3(this._entries);
              return t3._entries.delete(e3), t3;
            }
            removeEntries(...e3) {
              let t3 = new r3(this._entries);
              for (let r4 of e3) t3._entries.delete(r4);
              return t3;
            }
            clear() {
              return new r3();
            }
          }
          t2.BaggageImpl = r3;
        }, 830: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.baggageEntryMetadataSymbol = void 0, t2.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
        }, 369: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.baggageEntryMetadataFromString = t2.createBaggage = void 0;
          let i2 = r3(930), n2 = r3(993), s2 = r3(830), a = i2.DiagAPI.instance();
          t2.createBaggage = function(e3 = {}) {
            return new n2.BaggageImpl(new Map(Object.entries(e3)));
          }, t2.baggageEntryMetadataFromString = function(e3) {
            return "string" != typeof e3 && (a.error(`Cannot create baggage metadata from unknown type: ${typeof e3}`), e3 = ""), { __TYPE__: s2.baggageEntryMetadataSymbol, toString: () => e3 };
          };
        }, 67: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.context = void 0, t2.context = r3(491).ContextAPI.getInstance();
        }, 223: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopContextManager = void 0;
          let i2 = r3(780);
          t2.NoopContextManager = class {
            active() {
              return i2.ROOT_CONTEXT;
            }
            with(e3, t3, r4, ...i3) {
              return t3.call(r4, ...i3);
            }
            bind(e3, t3) {
              return t3;
            }
            enable() {
              return this;
            }
            disable() {
              return this;
            }
          };
        }, 780: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ROOT_CONTEXT = t2.createContextKey = void 0, t2.createContextKey = function(e3) {
            return Symbol.for(e3);
          };
          class r3 {
            constructor(e3) {
              let t3 = this;
              t3._currentContext = e3 ? new Map(e3) : /* @__PURE__ */ new Map(), t3.getValue = (e4) => t3._currentContext.get(e4), t3.setValue = (e4, i2) => {
                let n2 = new r3(t3._currentContext);
                return n2._currentContext.set(e4, i2), n2;
              }, t3.deleteValue = (e4) => {
                let i2 = new r3(t3._currentContext);
                return i2._currentContext.delete(e4), i2;
              };
            }
          }
          t2.ROOT_CONTEXT = new r3();
        }, 506: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.diag = void 0, t2.diag = r3(930).DiagAPI.instance();
        }, 56: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagComponentLogger = void 0;
          let i2 = r3(172);
          function n2(e3, t3, r4) {
            let n3 = (0, i2.getGlobal)("diag");
            if (n3) return r4.unshift(t3), n3[e3](...r4);
          }
          t2.DiagComponentLogger = class {
            constructor(e3) {
              this._namespace = e3.namespace || "DiagComponentLogger";
            }
            debug(...e3) {
              return n2("debug", this._namespace, e3);
            }
            error(...e3) {
              return n2("error", this._namespace, e3);
            }
            info(...e3) {
              return n2("info", this._namespace, e3);
            }
            warn(...e3) {
              return n2("warn", this._namespace, e3);
            }
            verbose(...e3) {
              return n2("verbose", this._namespace, e3);
            }
          };
        }, 972: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagConsoleLogger = void 0;
          let r3 = [{ n: "error", c: "error" }, { n: "warn", c: "warn" }, { n: "info", c: "info" }, { n: "debug", c: "debug" }, { n: "verbose", c: "trace" }];
          t2.DiagConsoleLogger = class {
            constructor() {
              for (let e3 = 0; e3 < r3.length; e3++) this[r3[e3].n] = /* @__PURE__ */ function(e4) {
                return function(...t3) {
                  if (console) {
                    let r4 = console[e4];
                    if ("function" != typeof r4 && (r4 = console.log), "function" == typeof r4) return r4.apply(console, t3);
                  }
                };
              }(r3[e3].c);
            }
          };
        }, 912: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createLogLevelDiagLogger = void 0;
          let i2 = r3(957);
          t2.createLogLevelDiagLogger = function(e3, t3) {
            function r4(r5, i3) {
              let n2 = t3[r5];
              return "function" == typeof n2 && e3 >= i3 ? n2.bind(t3) : function() {
              };
            }
            return e3 < i2.DiagLogLevel.NONE ? e3 = i2.DiagLogLevel.NONE : e3 > i2.DiagLogLevel.ALL && (e3 = i2.DiagLogLevel.ALL), t3 = t3 || {}, { error: r4("error", i2.DiagLogLevel.ERROR), warn: r4("warn", i2.DiagLogLevel.WARN), info: r4("info", i2.DiagLogLevel.INFO), debug: r4("debug", i2.DiagLogLevel.DEBUG), verbose: r4("verbose", i2.DiagLogLevel.VERBOSE) };
          };
        }, 957: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagLogLevel = void 0, function(e3) {
            e3[e3.NONE = 0] = "NONE", e3[e3.ERROR = 30] = "ERROR", e3[e3.WARN = 50] = "WARN", e3[e3.INFO = 60] = "INFO", e3[e3.DEBUG = 70] = "DEBUG", e3[e3.VERBOSE = 80] = "VERBOSE", e3[e3.ALL = 9999] = "ALL";
          }(t2.DiagLogLevel || (t2.DiagLogLevel = {}));
        }, 172: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.unregisterGlobal = t2.getGlobal = t2.registerGlobal = void 0;
          let i2 = r3(200), n2 = r3(521), s2 = r3(130), a = n2.VERSION.split(".")[0], o = Symbol.for(`opentelemetry.js.api.${a}`), l = i2._globalThis;
          t2.registerGlobal = function(e3, t3, r4, i3 = false) {
            var s3;
            let a2 = l[o] = null != (s3 = l[o]) ? s3 : { version: n2.VERSION };
            if (!i3 && a2[e3]) {
              let t4 = Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e3}`);
              return r4.error(t4.stack || t4.message), false;
            }
            if (a2.version !== n2.VERSION) {
              let t4 = Error(`@opentelemetry/api: Registration of version v${a2.version} for ${e3} does not match previously registered API v${n2.VERSION}`);
              return r4.error(t4.stack || t4.message), false;
            }
            return a2[e3] = t3, r4.debug(`@opentelemetry/api: Registered a global for ${e3} v${n2.VERSION}.`), true;
          }, t2.getGlobal = function(e3) {
            var t3, r4;
            let i3 = null == (t3 = l[o]) ? void 0 : t3.version;
            if (i3 && (0, s2.isCompatible)(i3)) return null == (r4 = l[o]) ? void 0 : r4[e3];
          }, t2.unregisterGlobal = function(e3, t3) {
            t3.debug(`@opentelemetry/api: Unregistering a global for ${e3} v${n2.VERSION}.`);
            let r4 = l[o];
            r4 && delete r4[e3];
          };
        }, 130: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.isCompatible = t2._makeCompatibilityCheck = void 0;
          let i2 = r3(521), n2 = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
          function s2(e3) {
            let t3 = /* @__PURE__ */ new Set([e3]), r4 = /* @__PURE__ */ new Set(), i3 = e3.match(n2);
            if (!i3) return () => false;
            let s3 = { major: +i3[1], minor: +i3[2], patch: +i3[3], prerelease: i3[4] };
            if (null != s3.prerelease) return function(t4) {
              return t4 === e3;
            };
            function a(e4) {
              return r4.add(e4), false;
            }
            return function(e4) {
              if (t3.has(e4)) return true;
              if (r4.has(e4)) return false;
              let i4 = e4.match(n2);
              if (!i4) return a(e4);
              let o = { major: +i4[1], minor: +i4[2], patch: +i4[3], prerelease: i4[4] };
              if (null != o.prerelease || s3.major !== o.major) return a(e4);
              if (0 === s3.major) return s3.minor === o.minor && s3.patch <= o.patch ? (t3.add(e4), true) : a(e4);
              return s3.minor <= o.minor ? (t3.add(e4), true) : a(e4);
            };
          }
          t2._makeCompatibilityCheck = s2, t2.isCompatible = s2(i2.VERSION);
        }, 886: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.metrics = void 0, t2.metrics = r3(653).MetricsAPI.getInstance();
        }, 901: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ValueType = void 0, function(e3) {
            e3[e3.INT = 0] = "INT", e3[e3.DOUBLE = 1] = "DOUBLE";
          }(t2.ValueType || (t2.ValueType = {}));
        }, 102: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createNoopMeter = t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = t2.NOOP_OBSERVABLE_GAUGE_METRIC = t2.NOOP_OBSERVABLE_COUNTER_METRIC = t2.NOOP_UP_DOWN_COUNTER_METRIC = t2.NOOP_HISTOGRAM_METRIC = t2.NOOP_COUNTER_METRIC = t2.NOOP_METER = t2.NoopObservableUpDownCounterMetric = t2.NoopObservableGaugeMetric = t2.NoopObservableCounterMetric = t2.NoopObservableMetric = t2.NoopHistogramMetric = t2.NoopUpDownCounterMetric = t2.NoopCounterMetric = t2.NoopMetric = t2.NoopMeter = void 0;
          class r3 {
            constructor() {
            }
            createHistogram(e3, r4) {
              return t2.NOOP_HISTOGRAM_METRIC;
            }
            createCounter(e3, r4) {
              return t2.NOOP_COUNTER_METRIC;
            }
            createUpDownCounter(e3, r4) {
              return t2.NOOP_UP_DOWN_COUNTER_METRIC;
            }
            createObservableGauge(e3, r4) {
              return t2.NOOP_OBSERVABLE_GAUGE_METRIC;
            }
            createObservableCounter(e3, r4) {
              return t2.NOOP_OBSERVABLE_COUNTER_METRIC;
            }
            createObservableUpDownCounter(e3, r4) {
              return t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
            }
            addBatchObservableCallback(e3, t3) {
            }
            removeBatchObservableCallback(e3) {
            }
          }
          t2.NoopMeter = r3;
          class i2 {
          }
          t2.NoopMetric = i2;
          class n2 extends i2 {
            add(e3, t3) {
            }
          }
          t2.NoopCounterMetric = n2;
          class s2 extends i2 {
            add(e3, t3) {
            }
          }
          t2.NoopUpDownCounterMetric = s2;
          class a extends i2 {
            record(e3, t3) {
            }
          }
          t2.NoopHistogramMetric = a;
          class o {
            addCallback(e3) {
            }
            removeCallback(e3) {
            }
          }
          t2.NoopObservableMetric = o;
          class l extends o {
          }
          t2.NoopObservableCounterMetric = l;
          class c extends o {
          }
          t2.NoopObservableGaugeMetric = c;
          class u extends o {
          }
          t2.NoopObservableUpDownCounterMetric = u, t2.NOOP_METER = new r3(), t2.NOOP_COUNTER_METRIC = new n2(), t2.NOOP_HISTOGRAM_METRIC = new a(), t2.NOOP_UP_DOWN_COUNTER_METRIC = new s2(), t2.NOOP_OBSERVABLE_COUNTER_METRIC = new l(), t2.NOOP_OBSERVABLE_GAUGE_METRIC = new c(), t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new u(), t2.createNoopMeter = function() {
            return t2.NOOP_METER;
          };
        }, 660: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NOOP_METER_PROVIDER = t2.NoopMeterProvider = void 0;
          let i2 = r3(102);
          class n2 {
            getMeter(e3, t3, r4) {
              return i2.NOOP_METER;
            }
          }
          t2.NoopMeterProvider = n2, t2.NOOP_METER_PROVIDER = new n2();
        }, 200: function(e2, t2, r3) {
          var i2 = this && this.__createBinding || (Object.create ? function(e3, t3, r4, i3) {
            void 0 === i3 && (i3 = r4), Object.defineProperty(e3, i3, { enumerable: true, get: function() {
              return t3[r4];
            } });
          } : function(e3, t3, r4, i3) {
            void 0 === i3 && (i3 = r4), e3[i3] = t3[r4];
          }), n2 = this && this.__exportStar || function(e3, t3) {
            for (var r4 in e3) "default" === r4 || Object.prototype.hasOwnProperty.call(t3, r4) || i2(t3, e3, r4);
          };
          Object.defineProperty(t2, "__esModule", { value: true }), n2(r3(46), t2);
        }, 651: (t2, r3) => {
          Object.defineProperty(r3, "__esModule", { value: true }), r3._globalThis = void 0, r3._globalThis = "object" == typeof globalThis ? globalThis : e.g;
        }, 46: function(e2, t2, r3) {
          var i2 = this && this.__createBinding || (Object.create ? function(e3, t3, r4, i3) {
            void 0 === i3 && (i3 = r4), Object.defineProperty(e3, i3, { enumerable: true, get: function() {
              return t3[r4];
            } });
          } : function(e3, t3, r4, i3) {
            void 0 === i3 && (i3 = r4), e3[i3] = t3[r4];
          }), n2 = this && this.__exportStar || function(e3, t3) {
            for (var r4 in e3) "default" === r4 || Object.prototype.hasOwnProperty.call(t3, r4) || i2(t3, e3, r4);
          };
          Object.defineProperty(t2, "__esModule", { value: true }), n2(r3(651), t2);
        }, 939: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.propagation = void 0, t2.propagation = r3(181).PropagationAPI.getInstance();
        }, 874: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTextMapPropagator = void 0, t2.NoopTextMapPropagator = class {
            inject(e3, t3) {
            }
            extract(e3, t3) {
              return e3;
            }
            fields() {
              return [];
            }
          };
        }, 194: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.defaultTextMapSetter = t2.defaultTextMapGetter = void 0, t2.defaultTextMapGetter = { get(e3, t3) {
            if (null != e3) return e3[t3];
          }, keys: (e3) => null == e3 ? [] : Object.keys(e3) }, t2.defaultTextMapSetter = { set(e3, t3, r3) {
            null != e3 && (e3[t3] = r3);
          } };
        }, 845: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.trace = void 0, t2.trace = r3(997).TraceAPI.getInstance();
        }, 403: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NonRecordingSpan = void 0;
          let i2 = r3(476);
          t2.NonRecordingSpan = class {
            constructor(e3 = i2.INVALID_SPAN_CONTEXT) {
              this._spanContext = e3;
            }
            spanContext() {
              return this._spanContext;
            }
            setAttribute(e3, t3) {
              return this;
            }
            setAttributes(e3) {
              return this;
            }
            addEvent(e3, t3) {
              return this;
            }
            setStatus(e3) {
              return this;
            }
            updateName(e3) {
              return this;
            }
            end(e3) {
            }
            isRecording() {
              return false;
            }
            recordException(e3, t3) {
            }
          };
        }, 614: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTracer = void 0;
          let i2 = r3(491), n2 = r3(607), s2 = r3(403), a = r3(139), o = i2.ContextAPI.getInstance();
          t2.NoopTracer = class {
            startSpan(e3, t3, r4 = o.active()) {
              var i3;
              if (null == t3 ? void 0 : t3.root) return new s2.NonRecordingSpan();
              let l = r4 && (0, n2.getSpanContext)(r4);
              return "object" == typeof (i3 = l) && "string" == typeof i3.spanId && "string" == typeof i3.traceId && "number" == typeof i3.traceFlags && (0, a.isSpanContextValid)(l) ? new s2.NonRecordingSpan(l) : new s2.NonRecordingSpan();
            }
            startActiveSpan(e3, t3, r4, i3) {
              let s3, a2, l;
              if (arguments.length < 2) return;
              2 == arguments.length ? l = t3 : 3 == arguments.length ? (s3 = t3, l = r4) : (s3 = t3, a2 = r4, l = i3);
              let c = null != a2 ? a2 : o.active(), u = this.startSpan(e3, s3, c), d = (0, n2.setSpan)(c, u);
              return o.with(d, l, void 0, u);
            }
          };
        }, 124: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTracerProvider = void 0;
          let i2 = r3(614);
          t2.NoopTracerProvider = class {
            getTracer(e3, t3, r4) {
              return new i2.NoopTracer();
            }
          };
        }, 125: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ProxyTracer = void 0;
          let i2 = new (r3(614)).NoopTracer();
          t2.ProxyTracer = class {
            constructor(e3, t3, r4, i3) {
              this._provider = e3, this.name = t3, this.version = r4, this.options = i3;
            }
            startSpan(e3, t3, r4) {
              return this._getTracer().startSpan(e3, t3, r4);
            }
            startActiveSpan(e3, t3, r4, i3) {
              let n2 = this._getTracer();
              return Reflect.apply(n2.startActiveSpan, n2, arguments);
            }
            _getTracer() {
              if (this._delegate) return this._delegate;
              let e3 = this._provider.getDelegateTracer(this.name, this.version, this.options);
              return e3 ? (this._delegate = e3, this._delegate) : i2;
            }
          };
        }, 846: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ProxyTracerProvider = void 0;
          let i2 = r3(125), n2 = new (r3(124)).NoopTracerProvider();
          t2.ProxyTracerProvider = class {
            getTracer(e3, t3, r4) {
              var n3;
              return null != (n3 = this.getDelegateTracer(e3, t3, r4)) ? n3 : new i2.ProxyTracer(this, e3, t3, r4);
            }
            getDelegate() {
              var e3;
              return null != (e3 = this._delegate) ? e3 : n2;
            }
            setDelegate(e3) {
              this._delegate = e3;
            }
            getDelegateTracer(e3, t3, r4) {
              var i3;
              return null == (i3 = this._delegate) ? void 0 : i3.getTracer(e3, t3, r4);
            }
          };
        }, 996: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SamplingDecision = void 0, function(e3) {
            e3[e3.NOT_RECORD = 0] = "NOT_RECORD", e3[e3.RECORD = 1] = "RECORD", e3[e3.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED";
          }(t2.SamplingDecision || (t2.SamplingDecision = {}));
        }, 607: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.getSpanContext = t2.setSpanContext = t2.deleteSpan = t2.setSpan = t2.getActiveSpan = t2.getSpan = void 0;
          let i2 = r3(780), n2 = r3(403), s2 = r3(491), a = (0, i2.createContextKey)("OpenTelemetry Context Key SPAN");
          function o(e3) {
            return e3.getValue(a) || void 0;
          }
          function l(e3, t3) {
            return e3.setValue(a, t3);
          }
          t2.getSpan = o, t2.getActiveSpan = function() {
            return o(s2.ContextAPI.getInstance().active());
          }, t2.setSpan = l, t2.deleteSpan = function(e3) {
            return e3.deleteValue(a);
          }, t2.setSpanContext = function(e3, t3) {
            return l(e3, new n2.NonRecordingSpan(t3));
          }, t2.getSpanContext = function(e3) {
            var t3;
            return null == (t3 = o(e3)) ? void 0 : t3.spanContext();
          };
        }, 325: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceStateImpl = void 0;
          let i2 = r3(564);
          class n2 {
            constructor(e3) {
              this._internalState = /* @__PURE__ */ new Map(), e3 && this._parse(e3);
            }
            set(e3, t3) {
              let r4 = this._clone();
              return r4._internalState.has(e3) && r4._internalState.delete(e3), r4._internalState.set(e3, t3), r4;
            }
            unset(e3) {
              let t3 = this._clone();
              return t3._internalState.delete(e3), t3;
            }
            get(e3) {
              return this._internalState.get(e3);
            }
            serialize() {
              return this._keys().reduce((e3, t3) => (e3.push(t3 + "=" + this.get(t3)), e3), []).join(",");
            }
            _parse(e3) {
              !(e3.length > 512) && (this._internalState = e3.split(",").reverse().reduce((e4, t3) => {
                let r4 = t3.trim(), n3 = r4.indexOf("=");
                if (-1 !== n3) {
                  let s2 = r4.slice(0, n3), a = r4.slice(n3 + 1, t3.length);
                  (0, i2.validateKey)(s2) && (0, i2.validateValue)(a) && e4.set(s2, a);
                }
                return e4;
              }, /* @__PURE__ */ new Map()), this._internalState.size > 32 && (this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, 32))));
            }
            _keys() {
              return Array.from(this._internalState.keys()).reverse();
            }
            _clone() {
              let e3 = new n2();
              return e3._internalState = new Map(this._internalState), e3;
            }
          }
          t2.TraceStateImpl = n2;
        }, 564: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.validateValue = t2.validateKey = void 0;
          let r3 = "[_0-9a-z-*/]", i2 = `[a-z]${r3}{0,255}`, n2 = `[a-z0-9]${r3}{0,240}@[a-z]${r3}{0,13}`, s2 = RegExp(`^(?:${i2}|${n2})$`), a = /^[ -~]{0,255}[!-~]$/, o = /,|=/;
          t2.validateKey = function(e3) {
            return s2.test(e3);
          }, t2.validateValue = function(e3) {
            return a.test(e3) && !o.test(e3);
          };
        }, 98: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createTraceState = void 0;
          let i2 = r3(325);
          t2.createTraceState = function(e3) {
            return new i2.TraceStateImpl(e3);
          };
        }, 476: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.INVALID_SPAN_CONTEXT = t2.INVALID_TRACEID = t2.INVALID_SPANID = void 0;
          let i2 = r3(475);
          t2.INVALID_SPANID = "0000000000000000", t2.INVALID_TRACEID = "00000000000000000000000000000000", t2.INVALID_SPAN_CONTEXT = { traceId: t2.INVALID_TRACEID, spanId: t2.INVALID_SPANID, traceFlags: i2.TraceFlags.NONE };
        }, 357: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SpanKind = void 0, function(e3) {
            e3[e3.INTERNAL = 0] = "INTERNAL", e3[e3.SERVER = 1] = "SERVER", e3[e3.CLIENT = 2] = "CLIENT", e3[e3.PRODUCER = 3] = "PRODUCER", e3[e3.CONSUMER = 4] = "CONSUMER";
          }(t2.SpanKind || (t2.SpanKind = {}));
        }, 139: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.wrapSpanContext = t2.isSpanContextValid = t2.isValidSpanId = t2.isValidTraceId = void 0;
          let i2 = r3(476), n2 = r3(403), s2 = /^([0-9a-f]{32})$/i, a = /^[0-9a-f]{16}$/i;
          function o(e3) {
            return s2.test(e3) && e3 !== i2.INVALID_TRACEID;
          }
          function l(e3) {
            return a.test(e3) && e3 !== i2.INVALID_SPANID;
          }
          t2.isValidTraceId = o, t2.isValidSpanId = l, t2.isSpanContextValid = function(e3) {
            return o(e3.traceId) && l(e3.spanId);
          }, t2.wrapSpanContext = function(e3) {
            return new n2.NonRecordingSpan(e3);
          };
        }, 847: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SpanStatusCode = void 0, function(e3) {
            e3[e3.UNSET = 0] = "UNSET", e3[e3.OK = 1] = "OK", e3[e3.ERROR = 2] = "ERROR";
          }(t2.SpanStatusCode || (t2.SpanStatusCode = {}));
        }, 475: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceFlags = void 0, function(e3) {
            e3[e3.NONE = 0] = "NONE", e3[e3.SAMPLED = 1] = "SAMPLED";
          }(t2.TraceFlags || (t2.TraceFlags = {}));
        }, 521: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.VERSION = void 0, t2.VERSION = "1.6.0";
        } }, i = {};
        function n(e2) {
          var t2 = i[e2];
          if (void 0 !== t2) return t2.exports;
          var s2 = i[e2] = { exports: {} }, a = true;
          try {
            r2[e2].call(s2.exports, s2, s2.exports, n), a = false;
          } finally {
            a && delete i[e2];
          }
          return s2.exports;
        }
        n.ab = "/ROOT/node_modules/next/dist/compiled/@opentelemetry/api/";
        var s = {};
        (() => {
          Object.defineProperty(s, "__esModule", { value: true }), s.trace = s.propagation = s.metrics = s.diag = s.context = s.INVALID_SPAN_CONTEXT = s.INVALID_TRACEID = s.INVALID_SPANID = s.isValidSpanId = s.isValidTraceId = s.isSpanContextValid = s.createTraceState = s.TraceFlags = s.SpanStatusCode = s.SpanKind = s.SamplingDecision = s.ProxyTracerProvider = s.ProxyTracer = s.defaultTextMapSetter = s.defaultTextMapGetter = s.ValueType = s.createNoopMeter = s.DiagLogLevel = s.DiagConsoleLogger = s.ROOT_CONTEXT = s.createContextKey = s.baggageEntryMetadataFromString = void 0;
          var e2 = n(369);
          Object.defineProperty(s, "baggageEntryMetadataFromString", { enumerable: true, get: function() {
            return e2.baggageEntryMetadataFromString;
          } });
          var t2 = n(780);
          Object.defineProperty(s, "createContextKey", { enumerable: true, get: function() {
            return t2.createContextKey;
          } }), Object.defineProperty(s, "ROOT_CONTEXT", { enumerable: true, get: function() {
            return t2.ROOT_CONTEXT;
          } });
          var r3 = n(972);
          Object.defineProperty(s, "DiagConsoleLogger", { enumerable: true, get: function() {
            return r3.DiagConsoleLogger;
          } });
          var i2 = n(957);
          Object.defineProperty(s, "DiagLogLevel", { enumerable: true, get: function() {
            return i2.DiagLogLevel;
          } });
          var a = n(102);
          Object.defineProperty(s, "createNoopMeter", { enumerable: true, get: function() {
            return a.createNoopMeter;
          } });
          var o = n(901);
          Object.defineProperty(s, "ValueType", { enumerable: true, get: function() {
            return o.ValueType;
          } });
          var l = n(194);
          Object.defineProperty(s, "defaultTextMapGetter", { enumerable: true, get: function() {
            return l.defaultTextMapGetter;
          } }), Object.defineProperty(s, "defaultTextMapSetter", { enumerable: true, get: function() {
            return l.defaultTextMapSetter;
          } });
          var c = n(125);
          Object.defineProperty(s, "ProxyTracer", { enumerable: true, get: function() {
            return c.ProxyTracer;
          } });
          var u = n(846);
          Object.defineProperty(s, "ProxyTracerProvider", { enumerable: true, get: function() {
            return u.ProxyTracerProvider;
          } });
          var d = n(996);
          Object.defineProperty(s, "SamplingDecision", { enumerable: true, get: function() {
            return d.SamplingDecision;
          } });
          var h = n(357);
          Object.defineProperty(s, "SpanKind", { enumerable: true, get: function() {
            return h.SpanKind;
          } });
          var p = n(847);
          Object.defineProperty(s, "SpanStatusCode", { enumerable: true, get: function() {
            return p.SpanStatusCode;
          } });
          var f = n(475);
          Object.defineProperty(s, "TraceFlags", { enumerable: true, get: function() {
            return f.TraceFlags;
          } });
          var m = n(98);
          Object.defineProperty(s, "createTraceState", { enumerable: true, get: function() {
            return m.createTraceState;
          } });
          var g = n(139);
          Object.defineProperty(s, "isSpanContextValid", { enumerable: true, get: function() {
            return g.isSpanContextValid;
          } }), Object.defineProperty(s, "isValidTraceId", { enumerable: true, get: function() {
            return g.isValidTraceId;
          } }), Object.defineProperty(s, "isValidSpanId", { enumerable: true, get: function() {
            return g.isValidSpanId;
          } });
          var y = n(476);
          Object.defineProperty(s, "INVALID_SPANID", { enumerable: true, get: function() {
            return y.INVALID_SPANID;
          } }), Object.defineProperty(s, "INVALID_TRACEID", { enumerable: true, get: function() {
            return y.INVALID_TRACEID;
          } }), Object.defineProperty(s, "INVALID_SPAN_CONTEXT", { enumerable: true, get: function() {
            return y.INVALID_SPAN_CONTEXT;
          } });
          let _ = n(67);
          Object.defineProperty(s, "context", { enumerable: true, get: function() {
            return _.context;
          } });
          let b = n(506);
          Object.defineProperty(s, "diag", { enumerable: true, get: function() {
            return b.diag;
          } });
          let v = n(886);
          Object.defineProperty(s, "metrics", { enumerable: true, get: function() {
            return v.metrics;
          } });
          let w = n(939);
          Object.defineProperty(s, "propagation", { enumerable: true, get: function() {
            return w.propagation;
          } });
          let k = n(845);
          Object.defineProperty(s, "trace", { enumerable: true, get: function() {
            return k.trace;
          } }), s.default = { context: _.context, diag: b.diag, metrics: v.metrics, propagation: w.propagation, trace: k.trace };
        })(), t.exports = s;
      })();
    }, 71498, (e, t, r) => {
      (() => {
        "use strict";
        "undefined" != typeof __nccwpck_require__ && (__nccwpck_require__.ab = "/ROOT/node_modules/next/dist/compiled/cookie/");
        var e2 = {};
        (() => {
          e2.parse = function(e3, r3) {
            if ("string" != typeof e3) throw TypeError("argument str must be a string");
            for (var n2 = {}, s = e3.split(i), a = (r3 || {}).decode || t2, o = 0; o < s.length; o++) {
              var l = s[o], c = l.indexOf("=");
              if (!(c < 0)) {
                var u = l.substr(0, c).trim(), d = l.substr(++c, l.length).trim();
                '"' == d[0] && (d = d.slice(1, -1)), void 0 == n2[u] && (n2[u] = function(e4, t3) {
                  try {
                    return t3(e4);
                  } catch (t4) {
                    return e4;
                  }
                }(d, a));
              }
            }
            return n2;
          }, e2.serialize = function(e3, t3, i2) {
            var s = i2 || {}, a = s.encode || r2;
            if ("function" != typeof a) throw TypeError("option encode is invalid");
            if (!n.test(e3)) throw TypeError("argument name is invalid");
            var o = a(t3);
            if (o && !n.test(o)) throw TypeError("argument val is invalid");
            var l = e3 + "=" + o;
            if (null != s.maxAge) {
              var c = s.maxAge - 0;
              if (isNaN(c) || !isFinite(c)) throw TypeError("option maxAge is invalid");
              l += "; Max-Age=" + Math.floor(c);
            }
            if (s.domain) {
              if (!n.test(s.domain)) throw TypeError("option domain is invalid");
              l += "; Domain=" + s.domain;
            }
            if (s.path) {
              if (!n.test(s.path)) throw TypeError("option path is invalid");
              l += "; Path=" + s.path;
            }
            if (s.expires) {
              if ("function" != typeof s.expires.toUTCString) throw TypeError("option expires is invalid");
              l += "; Expires=" + s.expires.toUTCString();
            }
            if (s.httpOnly && (l += "; HttpOnly"), s.secure && (l += "; Secure"), s.sameSite) switch ("string" == typeof s.sameSite ? s.sameSite.toLowerCase() : s.sameSite) {
              case true:
              case "strict":
                l += "; SameSite=Strict";
                break;
              case "lax":
                l += "; SameSite=Lax";
                break;
              case "none":
                l += "; SameSite=None";
                break;
              default:
                throw TypeError("option sameSite is invalid");
            }
            return l;
          };
          var t2 = decodeURIComponent, r2 = encodeURIComponent, i = /; */, n = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
        })(), t.exports = e2;
      })();
    }, 99734, (e, t, r) => {
      (() => {
        "use strict";
        var e2 = { 993: (e3) => {
          var t2 = Object.prototype.hasOwnProperty, r3 = "~";
          function i2() {
          }
          function n2(e4, t3, r4) {
            this.fn = e4, this.context = t3, this.once = r4 || false;
          }
          function s(e4, t3, i3, s2, a2) {
            if ("function" != typeof i3) throw TypeError("The listener must be a function");
            var o2 = new n2(i3, s2 || e4, a2), l = r3 ? r3 + t3 : t3;
            return e4._events[l] ? e4._events[l].fn ? e4._events[l] = [e4._events[l], o2] : e4._events[l].push(o2) : (e4._events[l] = o2, e4._eventsCount++), e4;
          }
          function a(e4, t3) {
            0 == --e4._eventsCount ? e4._events = new i2() : delete e4._events[t3];
          }
          function o() {
            this._events = new i2(), this._eventsCount = 0;
          }
          Object.create && (i2.prototype = /* @__PURE__ */ Object.create(null), new i2().__proto__ || (r3 = false)), o.prototype.eventNames = function() {
            var e4, i3, n3 = [];
            if (0 === this._eventsCount) return n3;
            for (i3 in e4 = this._events) t2.call(e4, i3) && n3.push(r3 ? i3.slice(1) : i3);
            return Object.getOwnPropertySymbols ? n3.concat(Object.getOwnPropertySymbols(e4)) : n3;
          }, o.prototype.listeners = function(e4) {
            var t3 = r3 ? r3 + e4 : e4, i3 = this._events[t3];
            if (!i3) return [];
            if (i3.fn) return [i3.fn];
            for (var n3 = 0, s2 = i3.length, a2 = Array(s2); n3 < s2; n3++) a2[n3] = i3[n3].fn;
            return a2;
          }, o.prototype.listenerCount = function(e4) {
            var t3 = r3 ? r3 + e4 : e4, i3 = this._events[t3];
            return i3 ? i3.fn ? 1 : i3.length : 0;
          }, o.prototype.emit = function(e4, t3, i3, n3, s2, a2) {
            var o2 = r3 ? r3 + e4 : e4;
            if (!this._events[o2]) return false;
            var l, c, u = this._events[o2], d = arguments.length;
            if (u.fn) {
              switch (u.once && this.removeListener(e4, u.fn, void 0, true), d) {
                case 1:
                  return u.fn.call(u.context), true;
                case 2:
                  return u.fn.call(u.context, t3), true;
                case 3:
                  return u.fn.call(u.context, t3, i3), true;
                case 4:
                  return u.fn.call(u.context, t3, i3, n3), true;
                case 5:
                  return u.fn.call(u.context, t3, i3, n3, s2), true;
                case 6:
                  return u.fn.call(u.context, t3, i3, n3, s2, a2), true;
              }
              for (c = 1, l = Array(d - 1); c < d; c++) l[c - 1] = arguments[c];
              u.fn.apply(u.context, l);
            } else {
              var h, p = u.length;
              for (c = 0; c < p; c++) switch (u[c].once && this.removeListener(e4, u[c].fn, void 0, true), d) {
                case 1:
                  u[c].fn.call(u[c].context);
                  break;
                case 2:
                  u[c].fn.call(u[c].context, t3);
                  break;
                case 3:
                  u[c].fn.call(u[c].context, t3, i3);
                  break;
                case 4:
                  u[c].fn.call(u[c].context, t3, i3, n3);
                  break;
                default:
                  if (!l) for (h = 1, l = Array(d - 1); h < d; h++) l[h - 1] = arguments[h];
                  u[c].fn.apply(u[c].context, l);
              }
            }
            return true;
          }, o.prototype.on = function(e4, t3, r4) {
            return s(this, e4, t3, r4, false);
          }, o.prototype.once = function(e4, t3, r4) {
            return s(this, e4, t3, r4, true);
          }, o.prototype.removeListener = function(e4, t3, i3, n3) {
            var s2 = r3 ? r3 + e4 : e4;
            if (!this._events[s2]) return this;
            if (!t3) return a(this, s2), this;
            var o2 = this._events[s2];
            if (o2.fn) o2.fn !== t3 || n3 && !o2.once || i3 && o2.context !== i3 || a(this, s2);
            else {
              for (var l = 0, c = [], u = o2.length; l < u; l++) (o2[l].fn !== t3 || n3 && !o2[l].once || i3 && o2[l].context !== i3) && c.push(o2[l]);
              c.length ? this._events[s2] = 1 === c.length ? c[0] : c : a(this, s2);
            }
            return this;
          }, o.prototype.removeAllListeners = function(e4) {
            var t3;
            return e4 ? (t3 = r3 ? r3 + e4 : e4, this._events[t3] && a(this, t3)) : (this._events = new i2(), this._eventsCount = 0), this;
          }, o.prototype.off = o.prototype.removeListener, o.prototype.addListener = o.prototype.on, o.prefixed = r3, o.EventEmitter = o, e3.exports = o;
        }, 213: (e3) => {
          e3.exports = (e4, t2) => (t2 = t2 || (() => {
          }), e4.then((e5) => new Promise((e6) => {
            e6(t2());
          }).then(() => e5), (e5) => new Promise((e6) => {
            e6(t2());
          }).then(() => {
            throw e5;
          })));
        }, 574: (e3, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.default = function(e4, t3, r3) {
            let i2 = 0, n2 = e4.length;
            for (; n2 > 0; ) {
              let s = n2 / 2 | 0, a = i2 + s;
              0 >= r3(e4[a], t3) ? (i2 = ++a, n2 -= s + 1) : n2 = s;
            }
            return i2;
          };
        }, 821: (e3, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true });
          let i2 = r3(574);
          t2.default = class {
            constructor() {
              this._queue = [];
            }
            enqueue(e4, t3) {
              let r4 = { priority: (t3 = Object.assign({ priority: 0 }, t3)).priority, run: e4 };
              if (this.size && this._queue[this.size - 1].priority >= t3.priority) return void this._queue.push(r4);
              let n2 = i2.default(this._queue, r4, (e5, t4) => t4.priority - e5.priority);
              this._queue.splice(n2, 0, r4);
            }
            dequeue() {
              let e4 = this._queue.shift();
              return null == e4 ? void 0 : e4.run;
            }
            filter(e4) {
              return this._queue.filter((t3) => t3.priority === e4.priority).map((e5) => e5.run);
            }
            get size() {
              return this._queue.length;
            }
          };
        }, 816: (e3, t2, r3) => {
          let i2 = r3(213);
          class n2 extends Error {
            constructor(e4) {
              super(e4), this.name = "TimeoutError";
            }
          }
          let s = (e4, t3, r4) => new Promise((s2, a) => {
            if ("number" != typeof t3 || t3 < 0) throw TypeError("Expected `milliseconds` to be a positive number");
            if (t3 === 1 / 0) return void s2(e4);
            let o = setTimeout(() => {
              if ("function" == typeof r4) {
                try {
                  s2(r4());
                } catch (e5) {
                  a(e5);
                }
                return;
              }
              let i3 = "string" == typeof r4 ? r4 : `Promise timed out after ${t3} milliseconds`, o2 = r4 instanceof Error ? r4 : new n2(i3);
              "function" == typeof e4.cancel && e4.cancel(), a(o2);
            }, t3);
            i2(e4.then(s2, a), () => {
              clearTimeout(o);
            });
          });
          e3.exports = s, e3.exports.default = s, e3.exports.TimeoutError = n2;
        } }, r2 = {};
        function i(t2) {
          var n2 = r2[t2];
          if (void 0 !== n2) return n2.exports;
          var s = r2[t2] = { exports: {} }, a = true;
          try {
            e2[t2](s, s.exports, i), a = false;
          } finally {
            a && delete r2[t2];
          }
          return s.exports;
        }
        i.ab = "/ROOT/node_modules/next/dist/compiled/p-queue/";
        var n = {};
        (() => {
          Object.defineProperty(n, "__esModule", { value: true });
          let e3 = i(993), t2 = i(816), r3 = i(821), s = () => {
          }, a = new t2.TimeoutError();
          n.default = class extends e3 {
            constructor(e4) {
              var t3, i2, n2, a2;
              if (super(), this._intervalCount = 0, this._intervalEnd = 0, this._pendingCount = 0, this._resolveEmpty = s, this._resolveIdle = s, !("number" == typeof (e4 = Object.assign({ carryoverConcurrencyCount: false, intervalCap: 1 / 0, interval: 0, concurrency: 1 / 0, autoStart: true, queueClass: r3.default }, e4)).intervalCap && e4.intervalCap >= 1)) throw TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${null != (i2 = null == (t3 = e4.intervalCap) ? void 0 : t3.toString()) ? i2 : ""}\` (${typeof e4.intervalCap})`);
              if (void 0 === e4.interval || !(Number.isFinite(e4.interval) && e4.interval >= 0)) throw TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${null != (a2 = null == (n2 = e4.interval) ? void 0 : n2.toString()) ? a2 : ""}\` (${typeof e4.interval})`);
              this._carryoverConcurrencyCount = e4.carryoverConcurrencyCount, this._isIntervalIgnored = e4.intervalCap === 1 / 0 || 0 === e4.interval, this._intervalCap = e4.intervalCap, this._interval = e4.interval, this._queue = new e4.queueClass(), this._queueClass = e4.queueClass, this.concurrency = e4.concurrency, this._timeout = e4.timeout, this._throwOnTimeout = true === e4.throwOnTimeout, this._isPaused = false === e4.autoStart;
            }
            get _doesIntervalAllowAnother() {
              return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
            }
            get _doesConcurrentAllowAnother() {
              return this._pendingCount < this._concurrency;
            }
            _next() {
              this._pendingCount--, this._tryToStartAnother(), this.emit("next");
            }
            _resolvePromises() {
              this._resolveEmpty(), this._resolveEmpty = s, 0 === this._pendingCount && (this._resolveIdle(), this._resolveIdle = s, this.emit("idle"));
            }
            _onResumeInterval() {
              this._onInterval(), this._initializeIntervalIfNeeded(), this._timeoutId = void 0;
            }
            _isIntervalPaused() {
              let e4 = Date.now();
              if (void 0 === this._intervalId) {
                let t3 = this._intervalEnd - e4;
                if (!(t3 < 0)) return void 0 === this._timeoutId && (this._timeoutId = setTimeout(() => {
                  this._onResumeInterval();
                }, t3)), true;
                this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
              }
              return false;
            }
            _tryToStartAnother() {
              if (0 === this._queue.size) return this._intervalId && clearInterval(this._intervalId), this._intervalId = void 0, this._resolvePromises(), false;
              if (!this._isPaused) {
                let e4 = !this._isIntervalPaused();
                if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
                  let t3 = this._queue.dequeue();
                  return !!t3 && (this.emit("active"), t3(), e4 && this._initializeIntervalIfNeeded(), true);
                }
              }
              return false;
            }
            _initializeIntervalIfNeeded() {
              this._isIntervalIgnored || void 0 !== this._intervalId || (this._intervalId = setInterval(() => {
                this._onInterval();
              }, this._interval), this._intervalEnd = Date.now() + this._interval);
            }
            _onInterval() {
              0 === this._intervalCount && 0 === this._pendingCount && this._intervalId && (clearInterval(this._intervalId), this._intervalId = void 0), this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0, this._processQueue();
            }
            _processQueue() {
              for (; this._tryToStartAnother(); ) ;
            }
            get concurrency() {
              return this._concurrency;
            }
            set concurrency(e4) {
              if (!("number" == typeof e4 && e4 >= 1)) throw TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${e4}\` (${typeof e4})`);
              this._concurrency = e4, this._processQueue();
            }
            async add(e4, r4 = {}) {
              return new Promise((i2, n2) => {
                let s2 = async () => {
                  this._pendingCount++, this._intervalCount++;
                  try {
                    let s3 = void 0 === this._timeout && void 0 === r4.timeout ? e4() : t2.default(Promise.resolve(e4()), void 0 === r4.timeout ? this._timeout : r4.timeout, () => {
                      (void 0 === r4.throwOnTimeout ? this._throwOnTimeout : r4.throwOnTimeout) && n2(a);
                    });
                    i2(await s3);
                  } catch (e5) {
                    n2(e5);
                  }
                  this._next();
                };
                this._queue.enqueue(s2, r4), this._tryToStartAnother(), this.emit("add");
              });
            }
            async addAll(e4, t3) {
              return Promise.all(e4.map(async (e5) => this.add(e5, t3)));
            }
            start() {
              return this._isPaused && (this._isPaused = false, this._processQueue()), this;
            }
            pause() {
              this._isPaused = true;
            }
            clear() {
              this._queue = new this._queueClass();
            }
            async onEmpty() {
              if (0 !== this._queue.size) return new Promise((e4) => {
                let t3 = this._resolveEmpty;
                this._resolveEmpty = () => {
                  t3(), e4();
                };
              });
            }
            async onIdle() {
              if (0 !== this._pendingCount || 0 !== this._queue.size) return new Promise((e4) => {
                let t3 = this._resolveIdle;
                this._resolveIdle = () => {
                  t3(), e4();
                };
              });
            }
            get size() {
              return this._queue.size;
            }
            sizeBy(e4) {
              return this._queue.filter(e4).length;
            }
            get pending() {
              return this._pendingCount;
            }
            get isPaused() {
              return this._isPaused;
            }
            get timeout() {
              return this._timeout;
            }
            set timeout(e4) {
              this._timeout = e4;
            }
          };
        })(), t.exports = n;
      })();
    }, 51615, (e, t, r) => {
      t.exports = e.x("node:buffer", () => (init_node_buffer(), __toCommonJS(node_buffer_exports)));
    }, 78500, (e, t, r) => {
      t.exports = e.x("node:async_hooks", () => (init_node_async_hooks(), __toCommonJS(node_async_hooks_exports)));
    }, 25085, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true }), !function(e2, t2) {
        for (var r2 in t2) Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(r, { getTestReqInfo: function() {
        return a;
      }, withRequest: function() {
        return s;
      } });
      let i = new (e.r(78500)).AsyncLocalStorage();
      function n(e2, t2) {
        let r2 = t2.header(e2, "next-test-proxy-port");
        if (!r2) return;
        let i2 = t2.url(e2);
        return { url: i2, proxyPort: Number(r2), testData: t2.header(e2, "next-test-data") || "" };
      }
      function s(e2, t2, r2) {
        let s2 = n(e2, t2);
        return s2 ? i.run(s2, r2) : r2();
      }
      function a(e2, t2) {
        let r2 = i.getStore();
        return r2 || (e2 && t2 ? n(e2, t2) : void 0);
      }
    }, 28325, (e, t, r) => {
      "use strict";
      var i = e.i(51615);
      Object.defineProperty(r, "__esModule", { value: true }), !function(e2, t2) {
        for (var r2 in t2) Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(r, { handleFetch: function() {
        return o;
      }, interceptFetch: function() {
        return l;
      }, reader: function() {
        return s;
      } });
      let n = e.r(25085), s = { url: (e2) => e2.url, header: (e2, t2) => e2.headers.get(t2) };
      async function a(e2, t2) {
        let { url: r2, method: n2, headers: s2, body: a2, cache: o2, credentials: l2, integrity: c, mode: u, redirect: d, referrer: h, referrerPolicy: p } = t2;
        return { testData: e2, api: "fetch", request: { url: r2, method: n2, headers: [...Array.from(s2), ["next-test-stack", function() {
          let e3 = (Error().stack ?? "").split("\n");
          for (let t3 = 1; t3 < e3.length; t3++) if (e3[t3].length > 0) {
            e3 = e3.slice(t3);
            break;
          }
          return (e3 = (e3 = (e3 = e3.filter((e4) => !e4.includes("/next/dist/"))).slice(0, 5)).map((e4) => e4.replace("webpack-internal:///(rsc)/", "").trim())).join("    ");
        }()]], body: a2 ? i.Buffer.from(await t2.arrayBuffer()).toString("base64") : null, cache: o2, credentials: l2, integrity: c, mode: u, redirect: d, referrer: h, referrerPolicy: p } };
      }
      async function o(e2, t2) {
        let r2 = (0, n.getTestReqInfo)(t2, s);
        if (!r2) return e2(t2);
        let { testData: o2, proxyPort: l2 } = r2, c = await a(o2, t2), u = await e2(`http://localhost:${l2}`, { method: "POST", body: JSON.stringify(c), next: { internal: true } });
        if (!u.ok) throw Object.defineProperty(Error(`Proxy request failed: ${u.status}`), "__NEXT_ERROR_CODE", { value: "E146", enumerable: false, configurable: true });
        let d = await u.json(), { api: h } = d;
        switch (h) {
          case "continue":
            return e2(t2);
          case "abort":
          case "unhandled":
            throw Object.defineProperty(Error(`Proxy request aborted [${t2.method} ${t2.url}]`), "__NEXT_ERROR_CODE", { value: "E145", enumerable: false, configurable: true });
          case "fetch":
            let { status: p, headers: f, body: m } = d.response;
            return new Response(m ? i.Buffer.from(m, "base64") : null, { status: p, headers: new Headers(f) });
          default:
            return h;
        }
      }
      function l(t2) {
        return e.g.fetch = function(e2, r2) {
          var i2;
          return (null == r2 || null == (i2 = r2.next) ? void 0 : i2.internal) ? t2(e2, r2) : o(t2, new Request(e2, r2));
        }, () => {
          e.g.fetch = t2;
        };
      }
    }, 94165, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true }), !function(e2, t2) {
        for (var r2 in t2) Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(r, { interceptTestApis: function() {
        return s;
      }, wrapRequestHandler: function() {
        return a;
      } });
      let i = e.r(25085), n = e.r(28325);
      function s() {
        return (0, n.interceptFetch)(e.g.fetch);
      }
      function a(e2) {
        return (t2, r2) => (0, i.withRequest)(t2, n.reader, () => e2(t2, r2));
      }
    }, 99929, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true }), r.parse = function(e2, t2) {
        let r2 = new l(), i2 = e2.length;
        if (i2 < 2) return r2;
        let n2 = t2?.decode || d, s2 = 0;
        do {
          let t3 = e2.indexOf("=", s2);
          if (-1 === t3) break;
          let a2 = e2.indexOf(";", s2), o2 = -1 === a2 ? i2 : a2;
          if (t3 > o2) {
            s2 = e2.lastIndexOf(";", t3 - 1) + 1;
            continue;
          }
          let l2 = c(e2, s2, t3), d2 = u(e2, t3, l2), h = e2.slice(l2, d2);
          if (void 0 === r2[h]) {
            let i3 = c(e2, t3 + 1, o2), s3 = u(e2, o2, i3), a3 = n2(e2.slice(i3, s3));
            r2[h] = a3;
          }
          s2 = o2 + 1;
        } while (s2 < i2);
        return r2;
      }, r.serialize = function(e2, t2, r2) {
        let l2 = r2?.encode || encodeURIComponent;
        if (!i.test(e2)) throw TypeError(`argument name is invalid: ${e2}`);
        let c2 = l2(t2);
        if (!n.test(c2)) throw TypeError(`argument val is invalid: ${t2}`);
        let u2 = e2 + "=" + c2;
        if (!r2) return u2;
        if (void 0 !== r2.maxAge) {
          if (!Number.isInteger(r2.maxAge)) throw TypeError(`option maxAge is invalid: ${r2.maxAge}`);
          u2 += "; Max-Age=" + r2.maxAge;
        }
        if (r2.domain) {
          if (!s.test(r2.domain)) throw TypeError(`option domain is invalid: ${r2.domain}`);
          u2 += "; Domain=" + r2.domain;
        }
        if (r2.path) {
          if (!a.test(r2.path)) throw TypeError(`option path is invalid: ${r2.path}`);
          u2 += "; Path=" + r2.path;
        }
        if (r2.expires) {
          var d2;
          if (d2 = r2.expires, "[object Date]" !== o.call(d2) || !Number.isFinite(r2.expires.valueOf())) throw TypeError(`option expires is invalid: ${r2.expires}`);
          u2 += "; Expires=" + r2.expires.toUTCString();
        }
        if (r2.httpOnly && (u2 += "; HttpOnly"), r2.secure && (u2 += "; Secure"), r2.partitioned && (u2 += "; Partitioned"), r2.priority) switch ("string" == typeof r2.priority ? r2.priority.toLowerCase() : void 0) {
          case "low":
            u2 += "; Priority=Low";
            break;
          case "medium":
            u2 += "; Priority=Medium";
            break;
          case "high":
            u2 += "; Priority=High";
            break;
          default:
            throw TypeError(`option priority is invalid: ${r2.priority}`);
        }
        if (r2.sameSite) switch ("string" == typeof r2.sameSite ? r2.sameSite.toLowerCase() : r2.sameSite) {
          case true:
          case "strict":
            u2 += "; SameSite=Strict";
            break;
          case "lax":
            u2 += "; SameSite=Lax";
            break;
          case "none":
            u2 += "; SameSite=None";
            break;
          default:
            throw TypeError(`option sameSite is invalid: ${r2.sameSite}`);
        }
        return u2;
      };
      let i = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/, n = /^[\u0021-\u003A\u003C-\u007E]*$/, s = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i, a = /^[\u0020-\u003A\u003D-\u007E]*$/, o = Object.prototype.toString, l = (() => {
        let e2 = function() {
        };
        return e2.prototype = /* @__PURE__ */ Object.create(null), e2;
      })();
      function c(e2, t2, r2) {
        do {
          let r3 = e2.charCodeAt(t2);
          if (32 !== r3 && 9 !== r3) return t2;
        } while (++t2 < r2);
        return r2;
      }
      function u(e2, t2, r2) {
        for (; t2 > r2; ) {
          let r3 = e2.charCodeAt(--t2);
          if (32 !== r3 && 9 !== r3) return t2 + 1;
        }
        return r2;
      }
      function d(e2) {
        if (-1 === e2.indexOf("%")) return e2;
        try {
          return decodeURIComponent(e2);
        } catch (t2) {
          return e2;
        }
      }
    }, 92999, 51247, (e) => {
      "use strict";
      e.s([], 92999), e.s(["actionAsyncStorageInstance", () => t], 51247);
      let t = (0, e.i(90044).createAsyncLocalStorage)();
    }, 91375, (e) => {
      "use strict";
      e.s(["actionAsyncStorage", () => t.actionAsyncStorageInstance]), e.i(92999);
      var t = e.i(51247);
    }, 16852, 75982, 68585, 96588, (e) => {
      "use strict";
      e.s(["RedirectStatusCode", () => t], 16852);
      var t = function(e2) {
        return e2[e2.SeeOther = 303] = "SeeOther", e2[e2.TemporaryRedirect = 307] = "TemporaryRedirect", e2[e2.PermanentRedirect = 308] = "PermanentRedirect", e2;
      }({});
      e.s(["REDIRECT_ERROR_CODE", () => r, "RedirectType", () => i, "isRedirectError", () => n], 75982);
      let r = "NEXT_REDIRECT";
      var i = function(e2) {
        return e2.push = "push", e2.replace = "replace", e2;
      }({});
      function n(e2) {
        if ("object" != typeof e2 || null === e2 || !("digest" in e2) || "string" != typeof e2.digest) return false;
        let i2 = e2.digest.split(";"), [n2, s2] = i2, a2 = i2.slice(2, -2).join(";"), o2 = Number(i2.at(-2));
        return n2 === r && ("replace" === s2 || "push" === s2) && "string" == typeof a2 && !isNaN(o2) && o2 in t;
      }
      e.s(["HTTP_ERROR_FALLBACK_ERROR_CODE", () => a, "isHTTPAccessFallbackError", () => o], 68585);
      let s = new Set(Object.values({ NOT_FOUND: 404, FORBIDDEN: 403, UNAUTHORIZED: 401 })), a = "NEXT_HTTP_ERROR_FALLBACK";
      function o(e2) {
        if ("object" != typeof e2 || null === e2 || !("digest" in e2) || "string" != typeof e2.digest) return false;
        let [t2, r2] = e2.digest.split(";");
        return t2 === a && s.has(Number(r2));
      }
      function l(e2) {
        return n(e2) || o(e2);
      }
      e.s(["isNextRouterError", () => l], 96588);
    }, 82748, (e) => {
      "use strict";
      e.s(["unstable_rethrow", () => function e2(o) {
        if ((0, n.isNextRouterError)(o) || (0, i.isBailoutToCSRError)(o) || (0, a.isDynamicServerError)(o) || (0, s.isDynamicPostpone)(o) || "object" == typeof o && null !== o && o.$$typeof === r || (0, t.isHangingPromiseRejectionError)(o)) throw o;
        o instanceof Error && "cause" in o && e2(o.cause);
      }], 82748);
      var t = e.i(51564);
      let r = Symbol.for("react.postpone");
      var i = e.i(81828), n = e.i(96588), s = e.i(63072), a = e.i(18368);
    }, 64445, (e, t, r) => {
      (() => {
        var r2 = { 226: function(t2, r3) {
          !function(i2, n2) {
            "use strict";
            var s = "function", a = "undefined", o = "object", l = "string", c = "major", u = "model", d = "name", h = "type", p = "vendor", f = "version", m = "architecture", g = "console", y = "mobile", _ = "tablet", b = "smarttv", v = "wearable", w = "embedded", k = "Amazon", S = "Apple", T = "ASUS", E = "BlackBerry", x = "Browser", O = "Chrome", C = "Firefox", R = "Google", I = "Huawei", P = "Microsoft", A = "Motorola", N = "Opera", U = "Samsung", M = "Sharp", L = "Sony", D = "Xiaomi", q = "Zebra", j = "Facebook", H = "Chromium OS", B = "Mac OS", z = function(e2, t3) {
              var r4 = {};
              for (var i3 in e2) t3[i3] && t3[i3].length % 2 == 0 ? r4[i3] = t3[i3].concat(e2[i3]) : r4[i3] = e2[i3];
              return r4;
            }, K = function(e2) {
              for (var t3 = {}, r4 = 0; r4 < e2.length; r4++) t3[e2[r4].toUpperCase()] = e2[r4];
              return t3;
            }, J = function(e2, t3) {
              return typeof e2 === l && -1 !== $(t3).indexOf($(e2));
            }, $ = function(e2) {
              return e2.toLowerCase();
            }, F = function(e2, t3) {
              if (typeof e2 === l) return e2 = e2.replace(/^\s\s*/, ""), typeof t3 === a ? e2 : e2.substring(0, 350);
            }, W = function(e2, t3) {
              for (var r4, i3, a2, l2, c2, u2, d2 = 0; d2 < t3.length && !c2; ) {
                var h2 = t3[d2], p2 = t3[d2 + 1];
                for (r4 = i3 = 0; r4 < h2.length && !c2 && h2[r4]; ) if (c2 = h2[r4++].exec(e2)) for (a2 = 0; a2 < p2.length; a2++) u2 = c2[++i3], typeof (l2 = p2[a2]) === o && l2.length > 0 ? 2 === l2.length ? typeof l2[1] == s ? this[l2[0]] = l2[1].call(this, u2) : this[l2[0]] = l2[1] : 3 === l2.length ? typeof l2[1] !== s || l2[1].exec && l2[1].test ? this[l2[0]] = u2 ? u2.replace(l2[1], l2[2]) : void 0 : this[l2[0]] = u2 ? l2[1].call(this, u2, l2[2]) : void 0 : 4 === l2.length && (this[l2[0]] = u2 ? l2[3].call(this, u2.replace(l2[1], l2[2])) : n2) : this[l2] = u2 || n2;
                d2 += 2;
              }
            }, V = function(e2, t3) {
              for (var r4 in t3) if (typeof t3[r4] === o && t3[r4].length > 0) {
                for (var i3 = 0; i3 < t3[r4].length; i3++) if (J(t3[r4][i3], e2)) return "?" === r4 ? n2 : r4;
              } else if (J(t3[r4], e2)) return "?" === r4 ? n2 : r4;
              return e2;
            }, G = { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2e3: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", 8.1: "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" }, X = { browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [f, [d, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [f, [d, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [d, f], [/opios[\/ ]+([\w\.]+)/i], [f, [d, N + " Mini"]], [/\bopr\/([\w\.]+)/i], [f, [d, N]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(heytap|ovi)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i], [d, f], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [f, [d, "UC" + x]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i], [f, [d, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [f, [d, "WeChat"]], [/konqueror\/([\w\.]+)/i], [f, [d, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [f, [d, "IE"]], [/ya(?:search)?browser\/([\w\.]+)/i], [f, [d, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[d, /(.+)/, "$1 Secure " + x], f], [/\bfocus\/([\w\.]+)/i], [f, [d, C + " Focus"]], [/\bopt\/([\w\.]+)/i], [f, [d, N + " Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [f, [d, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [f, [d, "Dolphin"]], [/coast\/([\w\.]+)/i], [f, [d, N + " Coast"]], [/miuibrowser\/([\w\.]+)/i], [f, [d, "MIUI " + x]], [/fxios\/([-\w\.]+)/i], [f, [d, C]], [/\bqihu|(qi?ho?o?|360)browser/i], [[d, "360 " + x]], [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i], [[d, /(.+)/, "$1 " + x], f], [/(comodo_dragon)\/([\w\.]+)/i], [[d, /_/g, " "], f], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [d, f], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i], [d], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[d, j], f], [/(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [d, f], [/\bgsa\/([\w\.]+) .*safari\//i], [f, [d, "GSA"]], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [f, [d, "TikTok"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [f, [d, O + " Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[d, O + " WebView"], f], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [f, [d, "Android " + x]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [d, f], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [f, [d, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [f, d], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [d, [f, V, { "1.0": "/8", 1.2: "/1", 1.3: "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" }]], [/(webkit|khtml)\/([\w\.]+)/i], [d, f], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[d, "Netscape"], f], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [f, [d, C + " Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i], [d, f], [/(cobalt)\/([\w\.]+)/i], [d, [f, /master.|lts./, ""]]], cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[m, "amd64"]], [/(ia32(?=;))/i], [[m, $]], [/((?:i[346]|x)86)[;\)]/i], [[m, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[m, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[m, "armhf"]], [/windows (ce|mobile); ppc;/i], [[m, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[m, /ower/, "", $]], [/(sun4\w)[;\)]/i], [[m, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[m, $]]], device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [u, [p, U], [h, _]], [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [u, [p, U], [h, y]], [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i], [u, [p, S], [h, y]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [u, [p, S], [h, _]], [/(macintosh);/i], [u, [p, S]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [u, [p, M], [h, y]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [u, [p, I], [h, _]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [u, [p, I], [h, y]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[u, /_/g, " "], [p, D], [h, y]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[u, /_/g, " "], [p, D], [h, _]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [u, [p, "OPPO"], [h, y]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [u, [p, "Vivo"], [h, y]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [u, [p, "Realme"], [h, y]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [u, [p, A], [h, y]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [u, [p, A], [h, _]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [u, [p, "LG"], [h, _]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [u, [p, "LG"], [h, y]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [u, [p, "Lenovo"], [h, _]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[u, /_/g, " "], [p, "Nokia"], [h, y]], [/(pixel c)\b/i], [u, [p, R], [h, _]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [u, [p, R], [h, y]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [u, [p, L], [h, y]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[u, "Xperia Tablet"], [p, L], [h, _]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [u, [p, "OnePlus"], [h, y]], [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [u, [p, k], [h, _]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[u, /(.+)/g, "Fire Phone $1"], [p, k], [h, y]], [/(playbook);[-\w\),; ]+(rim)/i], [u, p, [h, _]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [u, [p, E], [h, y]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [u, [p, T], [h, _]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [u, [p, T], [h, y]], [/(nexus 9)/i], [u, [p, "HTC"], [h, _]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [p, [u, /_/g, " "], [h, y]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [u, [p, "Acer"], [h, _]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [u, [p, "Meizu"], [h, y]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [p, u, [h, y]], [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [p, u, [h, _]], [/(surface duo)/i], [u, [p, P], [h, _]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [u, [p, "Fairphone"], [h, y]], [/(u304aa)/i], [u, [p, "AT&T"], [h, y]], [/\bsie-(\w*)/i], [u, [p, "Siemens"], [h, y]], [/\b(rct\w+) b/i], [u, [p, "RCA"], [h, _]], [/\b(venue[\d ]{2,7}) b/i], [u, [p, "Dell"], [h, _]], [/\b(q(?:mv|ta)\w+) b/i], [u, [p, "Verizon"], [h, _]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [u, [p, "Barnes & Noble"], [h, _]], [/\b(tm\d{3}\w+) b/i], [u, [p, "NuVision"], [h, _]], [/\b(k88) b/i], [u, [p, "ZTE"], [h, _]], [/\b(nx\d{3}j) b/i], [u, [p, "ZTE"], [h, y]], [/\b(gen\d{3}) b.+49h/i], [u, [p, "Swiss"], [h, y]], [/\b(zur\d{3}) b/i], [u, [p, "Swiss"], [h, _]], [/\b((zeki)?tb.*\b) b/i], [u, [p, "Zeki"], [h, _]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[p, "Dragon Touch"], u, [h, _]], [/\b(ns-?\w{0,9}) b/i], [u, [p, "Insignia"], [h, _]], [/\b((nxa|next)-?\w{0,9}) b/i], [u, [p, "NextBook"], [h, _]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[p, "Voice"], u, [h, y]], [/\b(lvtel\-)?(v1[12]) b/i], [[p, "LvTel"], u, [h, y]], [/\b(ph-1) /i], [u, [p, "Essential"], [h, y]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [u, [p, "Envizen"], [h, _]], [/\b(trio[-\w\. ]+) b/i], [u, [p, "MachSpeed"], [h, _]], [/\btu_(1491) b/i], [u, [p, "Rotor"], [h, _]], [/(shield[\w ]+) b/i], [u, [p, "Nvidia"], [h, _]], [/(sprint) (\w+)/i], [p, u, [h, y]], [/(kin\.[onetw]{3})/i], [[u, /\./g, " "], [p, P], [h, y]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [u, [p, q], [h, _]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [u, [p, q], [h, y]], [/smart-tv.+(samsung)/i], [p, [h, b]], [/hbbtv.+maple;(\d+)/i], [[u, /^/, "SmartTV"], [p, U], [h, b]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[p, "LG"], [h, b]], [/(apple) ?tv/i], [p, [u, S + " TV"], [h, b]], [/crkey/i], [[u, O + "cast"], [p, R], [h, b]], [/droid.+aft(\w)( bui|\))/i], [u, [p, k], [h, b]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [u, [p, M], [h, b]], [/(bravia[\w ]+)( bui|\))/i], [u, [p, L], [h, b]], [/(mitv-\w{5}) bui/i], [u, [p, D], [h, b]], [/Hbbtv.*(technisat) (.*);/i], [p, u, [h, b]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[p, F], [u, F], [h, b]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[h, b]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [p, u, [h, g]], [/droid.+; (shield) bui/i], [u, [p, "Nvidia"], [h, g]], [/(playstation [345portablevi]+)/i], [u, [p, L], [h, g]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [u, [p, P], [h, g]], [/((pebble))app/i], [p, u, [h, v]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [u, [p, S], [h, v]], [/droid.+; (glass) \d/i], [u, [p, R], [h, v]], [/droid.+; (wt63?0{2,3})\)/i], [u, [p, q], [h, v]], [/(quest( 2| pro)?)/i], [u, [p, j], [h, v]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [p, [h, w]], [/(aeobc)\b/i], [u, [p, k], [h, w]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [u, [h, y]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [u, [h, _]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[h, _]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[h, y]], [/(android[-\w\. ]{0,9});.+buil/i], [u, [p, "Generic"]]], engine: [[/windows.+ edge\/([\w\.]+)/i], [f, [d, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [f, [d, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i], [d, f], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [f, d]], os: [[/microsoft (windows) (vista|xp)/i], [d, f], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [d, [f, V, G]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[d, "Windows"], [f, V, G]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /ios;fbsv\/([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[f, /_/g, "."], [d, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[d, B], [f, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [f, d], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [d, f], [/\(bb(10);/i], [f, [d, E]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [f, [d, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [f, [d, C + " OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [f, [d, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [f, [d, "watchOS"]], [/crkey\/([\d\.]+)/i], [f, [d, O + "cast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[d, H], f], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [d, f], [/(sunos) ?([\w\.\d]*)/i], [[d, "Solaris"], f], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i], [d, f]] }, Q = function(e2, t3) {
              if (typeof e2 === o && (t3 = e2, e2 = n2), !(this instanceof Q)) return new Q(e2, t3).getResult();
              var r4 = typeof i2 !== a && i2.navigator ? i2.navigator : n2, g2 = e2 || (r4 && r4.userAgent ? r4.userAgent : ""), b2 = r4 && r4.userAgentData ? r4.userAgentData : n2, v2 = t3 ? z(X, t3) : X, w2 = r4 && r4.userAgent == g2;
              return this.getBrowser = function() {
                var e3, t4 = {};
                return t4[d] = n2, t4[f] = n2, W.call(t4, g2, v2.browser), t4[c] = typeof (e3 = t4[f]) === l ? e3.replace(/[^\d\.]/g, "").split(".")[0] : n2, w2 && r4 && r4.brave && typeof r4.brave.isBrave == s && (t4[d] = "Brave"), t4;
              }, this.getCPU = function() {
                var e3 = {};
                return e3[m] = n2, W.call(e3, g2, v2.cpu), e3;
              }, this.getDevice = function() {
                var e3 = {};
                return e3[p] = n2, e3[u] = n2, e3[h] = n2, W.call(e3, g2, v2.device), w2 && !e3[h] && b2 && b2.mobile && (e3[h] = y), w2 && "Macintosh" == e3[u] && r4 && typeof r4.standalone !== a && r4.maxTouchPoints && r4.maxTouchPoints > 2 && (e3[u] = "iPad", e3[h] = _), e3;
              }, this.getEngine = function() {
                var e3 = {};
                return e3[d] = n2, e3[f] = n2, W.call(e3, g2, v2.engine), e3;
              }, this.getOS = function() {
                var e3 = {};
                return e3[d] = n2, e3[f] = n2, W.call(e3, g2, v2.os), w2 && !e3[d] && b2 && "Unknown" != b2.platform && (e3[d] = b2.platform.replace(/chrome os/i, H).replace(/macos/i, B)), e3;
              }, this.getResult = function() {
                return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };
              }, this.getUA = function() {
                return g2;
              }, this.setUA = function(e3) {
                return g2 = typeof e3 === l && e3.length > 350 ? F(e3, 350) : e3, this;
              }, this.setUA(g2), this;
            };
            if (Q.VERSION = "1.0.35", Q.BROWSER = K([d, f, c]), Q.CPU = K([m]), Q.DEVICE = K([u, p, h, g, y, b, _, v, w]), Q.ENGINE = Q.OS = K([d, f]), typeof r3 !== a) t2.exports && (r3 = t2.exports = Q), r3.UAParser = Q;
            else if (typeof define === s && define.amd) e.r, void 0 !== Q && e.v(Q);
            else typeof i2 !== a && (i2.UAParser = Q);
            var Y = typeof i2 !== a && (i2.jQuery || i2.Zepto);
            if (Y && !Y.ua) {
              var Z = new Q();
              Y.ua = Z.getResult(), Y.ua.get = function() {
                return Z.getUA();
              }, Y.ua.set = function(e2) {
                Z.setUA(e2);
                var t3 = Z.getResult();
                for (var r4 in t3) Y.ua[r4] = t3[r4];
              };
            }
          }(this);
        } }, i = {};
        function n(e2) {
          var t2 = i[e2];
          if (void 0 !== t2) return t2.exports;
          var s = i[e2] = { exports: {} }, a = true;
          try {
            r2[e2].call(s.exports, s, s.exports, n), a = false;
          } finally {
            a && delete i[e2];
          }
          return s.exports;
        }
        n.ab = "/ROOT/node_modules/next/dist/compiled/ua-parser-js/", t.exports = n(226);
      })();
    }, 42738, (e) => {
      "use strict";
      let t;
      async function r() {
        return "_ENTRIES" in globalThis && _ENTRIES.middleware_instrumentation && await _ENTRIES.middleware_instrumentation;
      }
      e.s(["default", () => oP], 42738);
      let i = null;
      async function n() {
        if ("phase-production-build" === process.env.NEXT_PHASE) return;
        i || (i = r());
        let e10 = await i;
        if (null == e10 ? void 0 : e10.register) try {
          await e10.register();
        } catch (e11) {
          throw e11.message = `An error occurred while loading instrumentation hook: ${e11.message}`, e11;
        }
      }
      async function s(...e10) {
        let t10 = await r();
        try {
          var i10;
          await (null == t10 || null == (i10 = t10.onRequestError) ? void 0 : i10.call(t10, ...e10));
        } catch (e11) {
          console.error("Error in instrumentation.onRequestError:", e11);
        }
      }
      let a = null;
      function o() {
        return a || (a = n()), a;
      }
      function l(e10) {
        return `The edge runtime does not support Node.js '${e10}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
      }
      process !== e.g.process && (process.env = e.g.process.env, e.g.process = process);
      try {
        Object.defineProperty(globalThis, "__import_unsupported", { value: function(e10) {
          let t10 = new Proxy(function() {
          }, { get(t11, r10) {
            if ("then" === r10) return {};
            throw Object.defineProperty(Error(l(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          }, construct() {
            throw Object.defineProperty(Error(l(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          }, apply(r10, i10, n10) {
            if ("function" == typeof n10[0]) return n10[0](t10);
            throw Object.defineProperty(Error(l(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          } });
          return new Proxy({}, { get: () => t10 });
        }, enumerable: false, configurable: false });
      } catch {
      }
      o();
      class c extends Error {
        constructor({ page: e10 }) {
          super(`The middleware "${e10}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
        }
      }
      class u extends Error {
        constructor() {
          super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
        }
      }
      class d extends Error {
        constructor() {
          super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
        }
      }
      let h = "_N_T_", p = { shared: "shared", reactServerComponents: "rsc", serverSideRendering: "ssr", actionBrowser: "action-browser", apiNode: "api-node", apiEdge: "api-edge", middleware: "middleware", instrument: "instrument", edgeAsset: "edge-asset", appPagesBrowser: "app-pages-browser", pagesDirBrowser: "pages-dir-browser", pagesDirEdge: "pages-dir-edge", pagesDirNode: "pages-dir-node" };
      function f(e10) {
        var t10, r10, i10, n10, s10, a10 = [], o2 = 0;
        function l2() {
          for (; o2 < e10.length && /\s/.test(e10.charAt(o2)); ) o2 += 1;
          return o2 < e10.length;
        }
        for (; o2 < e10.length; ) {
          for (t10 = o2, s10 = false; l2(); ) if ("," === (r10 = e10.charAt(o2))) {
            for (i10 = o2, o2 += 1, l2(), n10 = o2; o2 < e10.length && "=" !== (r10 = e10.charAt(o2)) && ";" !== r10 && "," !== r10; ) o2 += 1;
            o2 < e10.length && "=" === e10.charAt(o2) ? (s10 = true, o2 = n10, a10.push(e10.substring(t10, i10)), t10 = o2) : o2 = i10 + 1;
          } else o2 += 1;
          (!s10 || o2 >= e10.length) && a10.push(e10.substring(t10, e10.length));
        }
        return a10;
      }
      function m(e10) {
        let t10 = {}, r10 = [];
        if (e10) for (let [i10, n10] of e10.entries()) "set-cookie" === i10.toLowerCase() ? (r10.push(...f(n10)), t10[i10] = 1 === r10.length ? r10[0] : r10) : t10[i10] = n10;
        return t10;
      }
      function g(e10) {
        try {
          return String(new URL(String(e10)));
        } catch (t10) {
          throw Object.defineProperty(Error(`URL is malformed "${String(e10)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, { cause: t10 }), "__NEXT_ERROR_CODE", { value: "E61", enumerable: false, configurable: true });
        }
      }
      ({ ...p, GROUP: { builtinReact: [p.reactServerComponents, p.actionBrowser], serverOnly: [p.reactServerComponents, p.actionBrowser, p.instrument, p.middleware], neutralTarget: [p.apiNode, p.apiEdge], clientOnly: [p.serverSideRendering, p.appPagesBrowser], bundled: [p.reactServerComponents, p.actionBrowser, p.serverSideRendering, p.appPagesBrowser, p.shared, p.instrument, p.middleware], appPages: [p.reactServerComponents, p.serverSideRendering, p.appPagesBrowser, p.actionBrowser] } });
      let y = Symbol("response"), _ = Symbol("passThrough"), b = Symbol("waitUntil");
      class v {
        constructor(e10, t10) {
          this[_] = false, this[b] = t10 ? { kind: "external", function: t10 } : { kind: "internal", promises: [] };
        }
        respondWith(e10) {
          this[y] || (this[y] = Promise.resolve(e10));
        }
        passThroughOnException() {
          this[_] = true;
        }
        waitUntil(e10) {
          if ("external" === this[b].kind) return (0, this[b].function)(e10);
          this[b].promises.push(e10);
        }
      }
      class w extends v {
        constructor(e10) {
          var t10;
          super(e10.request, null == (t10 = e10.context) ? void 0 : t10.waitUntil), this.sourcePage = e10.page;
        }
        get request() {
          throw Object.defineProperty(new c({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        respondWith() {
          throw Object.defineProperty(new c({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
      }
      function k(e10) {
        return e10.replace(/\/$/, "") || "/";
      }
      function S(e10) {
        let t10 = e10.indexOf("#"), r10 = e10.indexOf("?"), i10 = r10 > -1 && (t10 < 0 || r10 < t10);
        return i10 || t10 > -1 ? { pathname: e10.substring(0, i10 ? r10 : t10), query: i10 ? e10.substring(r10, t10 > -1 ? t10 : void 0) : "", hash: t10 > -1 ? e10.slice(t10) : "" } : { pathname: e10, query: "", hash: "" };
      }
      function T(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r10, query: i10, hash: n10 } = S(e10);
        return "" + t10 + r10 + i10 + n10;
      }
      function E(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r10, query: i10, hash: n10 } = S(e10);
        return "" + r10 + t10 + i10 + n10;
      }
      function x(e10, t10) {
        if ("string" != typeof e10) return false;
        let { pathname: r10 } = S(e10);
        return r10 === t10 || r10.startsWith(t10 + "/");
      }
      let O = /* @__PURE__ */ new WeakMap();
      function C(e10, t10) {
        let r10;
        if (!t10) return { pathname: e10 };
        let i10 = O.get(t10);
        i10 || (i10 = t10.map((e11) => e11.toLowerCase()), O.set(t10, i10));
        let n10 = e10.split("/", 2);
        if (!n10[1]) return { pathname: e10 };
        let s10 = n10[1].toLowerCase(), a10 = i10.indexOf(s10);
        return a10 < 0 ? { pathname: e10 } : (r10 = t10[a10], { pathname: e10 = e10.slice(r10.length + 1) || "/", detectedLocale: r10 });
      }
      let R = /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;
      function I(e10, t10) {
        return new URL(String(e10).replace(R, "localhost"), t10 && String(t10).replace(R, "localhost"));
      }
      let P = Symbol("NextURLInternal");
      class A {
        constructor(e10, t10, r10) {
          let i10, n10;
          "object" == typeof t10 && "pathname" in t10 || "string" == typeof t10 ? (i10 = t10, n10 = r10 || {}) : n10 = r10 || t10 || {}, this[P] = { url: I(e10, i10 ?? n10.base), options: n10, basePath: "" }, this.analyze();
        }
        analyze() {
          var e10, t10, r10, i10, n10;
          let s10 = function(e11, t11) {
            var r11, i11;
            let { basePath: n11, i18n: s11, trailingSlash: a11 } = null != (r11 = t11.nextConfig) ? r11 : {}, o3 = { pathname: e11, trailingSlash: "/" !== e11 ? e11.endsWith("/") : a11 };
            n11 && x(o3.pathname, n11) && (o3.pathname = function(e12, t12) {
              if (!x(e12, t12)) return e12;
              let r12 = e12.slice(t12.length);
              return r12.startsWith("/") ? r12 : "/" + r12;
            }(o3.pathname, n11), o3.basePath = n11);
            let l2 = o3.pathname;
            if (o3.pathname.startsWith("/_next/data/") && o3.pathname.endsWith(".json")) {
              let e12 = o3.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/");
              o3.buildId = e12[0], l2 = "index" !== e12[1] ? "/" + e12.slice(1).join("/") : "/", true === t11.parseData && (o3.pathname = l2);
            }
            if (s11) {
              let e12 = t11.i18nProvider ? t11.i18nProvider.analyze(o3.pathname) : C(o3.pathname, s11.locales);
              o3.locale = e12.detectedLocale, o3.pathname = null != (i11 = e12.pathname) ? i11 : o3.pathname, !e12.detectedLocale && o3.buildId && (e12 = t11.i18nProvider ? t11.i18nProvider.analyze(l2) : C(l2, s11.locales)).detectedLocale && (o3.locale = e12.detectedLocale);
            }
            return o3;
          }(this[P].url.pathname, { nextConfig: this[P].options.nextConfig, parseData: true, i18nProvider: this[P].options.i18nProvider }), a10 = function(e11, t11) {
            let r11;
            if ((null == t11 ? void 0 : t11.host) && !Array.isArray(t11.host)) r11 = t11.host.toString().split(":", 1)[0];
            else {
              if (!e11.hostname) return;
              r11 = e11.hostname;
            }
            return r11.toLowerCase();
          }(this[P].url, this[P].options.headers);
          this[P].domainLocale = this[P].options.i18nProvider ? this[P].options.i18nProvider.detectDomainLocale(a10) : function(e11, t11, r11) {
            if (e11) for (let s11 of (r11 && (r11 = r11.toLowerCase()), e11)) {
              var i11, n11;
              if (t11 === (null == (i11 = s11.domain) ? void 0 : i11.split(":", 1)[0].toLowerCase()) || r11 === s11.defaultLocale.toLowerCase() || (null == (n11 = s11.locales) ? void 0 : n11.some((e12) => e12.toLowerCase() === r11))) return s11;
            }
          }(null == (t10 = this[P].options.nextConfig) || null == (e10 = t10.i18n) ? void 0 : e10.domains, a10);
          let o2 = (null == (r10 = this[P].domainLocale) ? void 0 : r10.defaultLocale) || (null == (n10 = this[P].options.nextConfig) || null == (i10 = n10.i18n) ? void 0 : i10.defaultLocale);
          this[P].url.pathname = s10.pathname, this[P].defaultLocale = o2, this[P].basePath = s10.basePath ?? "", this[P].buildId = s10.buildId, this[P].locale = s10.locale ?? o2, this[P].trailingSlash = s10.trailingSlash;
        }
        formatPathname() {
          var e10;
          let t10;
          return t10 = function(e11, t11, r10, i10) {
            if (!t11 || t11 === r10) return e11;
            let n10 = e11.toLowerCase();
            return !i10 && (x(n10, "/api") || x(n10, "/" + t11.toLowerCase())) ? e11 : T(e11, "/" + t11);
          }((e10 = { basePath: this[P].basePath, buildId: this[P].buildId, defaultLocale: this[P].options.forceLocale ? void 0 : this[P].defaultLocale, locale: this[P].locale, pathname: this[P].url.pathname, trailingSlash: this[P].trailingSlash }).pathname, e10.locale, e10.buildId ? void 0 : e10.defaultLocale, e10.ignorePrefix), (e10.buildId || !e10.trailingSlash) && (t10 = k(t10)), e10.buildId && (t10 = E(T(t10, "/_next/data/" + e10.buildId), "/" === e10.pathname ? "index.json" : ".json")), t10 = T(t10, e10.basePath), !e10.buildId && e10.trailingSlash ? t10.endsWith("/") ? t10 : E(t10, "/") : k(t10);
        }
        formatSearch() {
          return this[P].url.search;
        }
        get buildId() {
          return this[P].buildId;
        }
        set buildId(e10) {
          this[P].buildId = e10;
        }
        get locale() {
          return this[P].locale ?? "";
        }
        set locale(e10) {
          var t10, r10;
          if (!this[P].locale || !(null == (r10 = this[P].options.nextConfig) || null == (t10 = r10.i18n) ? void 0 : t10.locales.includes(e10))) throw Object.defineProperty(TypeError(`The NextURL configuration includes no locale "${e10}"`), "__NEXT_ERROR_CODE", { value: "E597", enumerable: false, configurable: true });
          this[P].locale = e10;
        }
        get defaultLocale() {
          return this[P].defaultLocale;
        }
        get domainLocale() {
          return this[P].domainLocale;
        }
        get searchParams() {
          return this[P].url.searchParams;
        }
        get host() {
          return this[P].url.host;
        }
        set host(e10) {
          this[P].url.host = e10;
        }
        get hostname() {
          return this[P].url.hostname;
        }
        set hostname(e10) {
          this[P].url.hostname = e10;
        }
        get port() {
          return this[P].url.port;
        }
        set port(e10) {
          this[P].url.port = e10;
        }
        get protocol() {
          return this[P].url.protocol;
        }
        set protocol(e10) {
          this[P].url.protocol = e10;
        }
        get href() {
          let e10 = this.formatPathname(), t10 = this.formatSearch();
          return `${this.protocol}//${this.host}${e10}${t10}${this.hash}`;
        }
        set href(e10) {
          this[P].url = I(e10), this.analyze();
        }
        get origin() {
          return this[P].url.origin;
        }
        get pathname() {
          return this[P].url.pathname;
        }
        set pathname(e10) {
          this[P].url.pathname = e10;
        }
        get hash() {
          return this[P].url.hash;
        }
        set hash(e10) {
          this[P].url.hash = e10;
        }
        get search() {
          return this[P].url.search;
        }
        set search(e10) {
          this[P].url.search = e10;
        }
        get password() {
          return this[P].url.password;
        }
        set password(e10) {
          this[P].url.password = e10;
        }
        get username() {
          return this[P].url.username;
        }
        set username(e10) {
          this[P].url.username = e10;
        }
        get basePath() {
          return this[P].basePath;
        }
        set basePath(e10) {
          this[P].basePath = e10.startsWith("/") ? e10 : `/${e10}`;
        }
        toString() {
          return this.href;
        }
        toJSON() {
          return this.href;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { href: this.href, origin: this.origin, protocol: this.protocol, username: this.username, password: this.password, host: this.host, hostname: this.hostname, port: this.port, pathname: this.pathname, search: this.search, searchParams: this.searchParams, hash: this.hash };
        }
        clone() {
          return new A(String(this), this[P].options);
        }
      }
      e.i(39e3);
      var N = e.i(28042);
      let U = Symbol("internal request");
      class M extends Request {
        constructor(e10, t10 = {}) {
          let r10 = "string" != typeof e10 && "url" in e10 ? e10.url : String(e10);
          g(r10), e10 instanceof Request ? super(e10, t10) : super(r10, t10);
          let i10 = new A(r10, { headers: m(this.headers), nextConfig: t10.nextConfig });
          this[U] = { cookies: new N.RequestCookies(this.headers), nextUrl: i10, url: i10.toString() };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, nextUrl: this.nextUrl, url: this.url, bodyUsed: this.bodyUsed, cache: this.cache, credentials: this.credentials, destination: this.destination, headers: Object.fromEntries(this.headers), integrity: this.integrity, keepalive: this.keepalive, method: this.method, mode: this.mode, redirect: this.redirect, referrer: this.referrer, referrerPolicy: this.referrerPolicy, signal: this.signal };
        }
        get cookies() {
          return this[U].cookies;
        }
        get nextUrl() {
          return this[U].nextUrl;
        }
        get page() {
          throw new u();
        }
        get ua() {
          throw new d();
        }
        get url() {
          return this[U].url;
        }
      }
      var L = e.i(17536);
      let D = Symbol("internal response"), q = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
      function j(e10, t10) {
        var r10;
        if (null == e10 || null == (r10 = e10.request) ? void 0 : r10.headers) {
          if (!(e10.request.headers instanceof Headers)) throw Object.defineProperty(Error("request.headers must be an instance of Headers"), "__NEXT_ERROR_CODE", { value: "E119", enumerable: false, configurable: true });
          let r11 = [];
          for (let [i10, n10] of e10.request.headers) t10.set("x-middleware-request-" + i10, n10), r11.push(i10);
          t10.set("x-middleware-override-headers", r11.join(","));
        }
      }
      class H extends Response {
        constructor(e10, t10 = {}) {
          super(e10, t10);
          let r10 = this.headers, i10 = new Proxy(new N.ResponseCookies(r10), { get(e11, i11, n10) {
            switch (i11) {
              case "delete":
              case "set":
                return (...n11) => {
                  let s10 = Reflect.apply(e11[i11], e11, n11), a10 = new Headers(r10);
                  return s10 instanceof N.ResponseCookies && r10.set("x-middleware-set-cookie", s10.getAll().map((e12) => (0, N.stringifyCookie)(e12)).join(",")), j(t10, a10), s10;
                };
              default:
                return L.ReflectAdapter.get(e11, i11, n10);
            }
          } });
          this[D] = { cookies: i10, url: t10.url ? new A(t10.url, { headers: m(r10), nextConfig: t10.nextConfig }) : void 0 };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, url: this.url, body: this.body, bodyUsed: this.bodyUsed, headers: Object.fromEntries(this.headers), ok: this.ok, redirected: this.redirected, status: this.status, statusText: this.statusText, type: this.type };
        }
        get cookies() {
          return this[D].cookies;
        }
        static json(e10, t10) {
          let r10 = Response.json(e10, t10);
          return new H(r10.body, r10);
        }
        static redirect(e10, t10) {
          let r10 = "number" == typeof t10 ? t10 : (null == t10 ? void 0 : t10.status) ?? 307;
          if (!q.has(r10)) throw Object.defineProperty(RangeError('Failed to execute "redirect" on "response": Invalid status code'), "__NEXT_ERROR_CODE", { value: "E529", enumerable: false, configurable: true });
          let i10 = "object" == typeof t10 ? t10 : {}, n10 = new Headers(null == i10 ? void 0 : i10.headers);
          return n10.set("Location", g(e10)), new H(null, { ...i10, headers: n10, status: r10 });
        }
        static rewrite(e10, t10) {
          let r10 = new Headers(null == t10 ? void 0 : t10.headers);
          return r10.set("x-middleware-rewrite", g(e10)), j(t10, r10), new H(null, { ...t10, headers: r10 });
        }
        static next(e10) {
          let t10 = new Headers(null == e10 ? void 0 : e10.headers);
          return t10.set("x-middleware-next", "1"), j(e10, t10), new H(null, { ...e10, headers: t10 });
        }
      }
      function B(e10, t10) {
        let r10 = "string" == typeof t10 ? new URL(t10) : t10, i10 = new URL(e10, t10), n10 = i10.origin === r10.origin;
        return { url: n10 ? i10.toString().slice(r10.origin.length) : i10.toString(), isRelative: n10 };
      }
      var z = e.i(24628);
      z.NEXT_RSC_UNION_QUERY;
      var K = e.i(48047), J = e.i(53065), $ = function(e10) {
        return e10.handleRequest = "BaseServer.handleRequest", e10.run = "BaseServer.run", e10.pipe = "BaseServer.pipe", e10.getStaticHTML = "BaseServer.getStaticHTML", e10.render = "BaseServer.render", e10.renderToResponseWithComponents = "BaseServer.renderToResponseWithComponents", e10.renderToResponse = "BaseServer.renderToResponse", e10.renderToHTML = "BaseServer.renderToHTML", e10.renderError = "BaseServer.renderError", e10.renderErrorToResponse = "BaseServer.renderErrorToResponse", e10.renderErrorToHTML = "BaseServer.renderErrorToHTML", e10.render404 = "BaseServer.render404", e10;
      }($ || {}), F = function(e10) {
        return e10.loadDefaultErrorComponents = "LoadComponents.loadDefaultErrorComponents", e10.loadComponents = "LoadComponents.loadComponents", e10;
      }(F || {}), W = function(e10) {
        return e10.getRequestHandler = "NextServer.getRequestHandler", e10.getServer = "NextServer.getServer", e10.getServerRequestHandler = "NextServer.getServerRequestHandler", e10.createServer = "createServer.createServer", e10;
      }(W || {}), V = function(e10) {
        return e10.compression = "NextNodeServer.compression", e10.getBuildId = "NextNodeServer.getBuildId", e10.createComponentTree = "NextNodeServer.createComponentTree", e10.clientComponentLoading = "NextNodeServer.clientComponentLoading", e10.getLayoutOrPageModule = "NextNodeServer.getLayoutOrPageModule", e10.generateStaticRoutes = "NextNodeServer.generateStaticRoutes", e10.generateFsStaticRoutes = "NextNodeServer.generateFsStaticRoutes", e10.generatePublicRoutes = "NextNodeServer.generatePublicRoutes", e10.generateImageRoutes = "NextNodeServer.generateImageRoutes.route", e10.sendRenderResult = "NextNodeServer.sendRenderResult", e10.proxyRequest = "NextNodeServer.proxyRequest", e10.runApi = "NextNodeServer.runApi", e10.render = "NextNodeServer.render", e10.renderHTML = "NextNodeServer.renderHTML", e10.imageOptimizer = "NextNodeServer.imageOptimizer", e10.getPagePath = "NextNodeServer.getPagePath", e10.getRoutesManifest = "NextNodeServer.getRoutesManifest", e10.findPageComponents = "NextNodeServer.findPageComponents", e10.getFontManifest = "NextNodeServer.getFontManifest", e10.getServerComponentManifest = "NextNodeServer.getServerComponentManifest", e10.getRequestHandler = "NextNodeServer.getRequestHandler", e10.renderToHTML = "NextNodeServer.renderToHTML", e10.renderError = "NextNodeServer.renderError", e10.renderErrorToHTML = "NextNodeServer.renderErrorToHTML", e10.render404 = "NextNodeServer.render404", e10.startResponse = "NextNodeServer.startResponse", e10.route = "route", e10.onProxyReq = "onProxyReq", e10.apiResolver = "apiResolver", e10.internalFetch = "internalFetch", e10;
      }(V || {}), G = function(e10) {
        return e10.startServer = "startServer.startServer", e10;
      }(G || {}), X = function(e10) {
        return e10.getServerSideProps = "Render.getServerSideProps", e10.getStaticProps = "Render.getStaticProps", e10.renderToString = "Render.renderToString", e10.renderDocument = "Render.renderDocument", e10.createBodyResult = "Render.createBodyResult", e10;
      }(X || {}), Q = function(e10) {
        return e10.renderToString = "AppRender.renderToString", e10.renderToReadableStream = "AppRender.renderToReadableStream", e10.getBodyResult = "AppRender.getBodyResult", e10.fetch = "AppRender.fetch", e10;
      }(Q || {}), Y = function(e10) {
        return e10.executeRoute = "Router.executeRoute", e10;
      }(Y || {}), Z = function(e10) {
        return e10.runHandler = "Node.runHandler", e10;
      }(Z || {}), ee = function(e10) {
        return e10.runHandler = "AppRouteRouteHandlers.runHandler", e10;
      }(ee || {}), et = function(e10) {
        return e10.generateMetadata = "ResolveMetadata.generateMetadata", e10.generateViewport = "ResolveMetadata.generateViewport", e10;
      }(et || {}), er = function(e10) {
        return e10.execute = "Middleware.execute", e10;
      }(er || {});
      let ei = ["Middleware.execute", "BaseServer.handleRequest", "Render.getServerSideProps", "Render.getStaticProps", "AppRender.fetch", "AppRender.getBodyResult", "Render.renderDocument", "Node.runHandler", "AppRouteRouteHandlers.runHandler", "ResolveMetadata.generateMetadata", "ResolveMetadata.generateViewport", "NextNodeServer.createComponentTree", "NextNodeServer.findPageComponents", "NextNodeServer.getLayoutOrPageModule", "NextNodeServer.startResponse", "NextNodeServer.clientComponentLoading"], en = ["NextNodeServer.findPageComponents", "NextNodeServer.createComponentTree", "NextNodeServer.clientComponentLoading"];
      function es(e10) {
        return null !== e10 && "object" == typeof e10 && "then" in e10 && "function" == typeof e10.then;
      }
      let { context: ea, propagation: eo, trace: el, SpanStatusCode: ec, SpanKind: eu, ROOT_CONTEXT: ed } = t = e.r(59110);
      class eh extends Error {
        constructor(e10, t10) {
          super(), this.bubble = e10, this.result = t10;
        }
      }
      let ep = (e10, t10) => {
        (function(e11) {
          return "object" == typeof e11 && null !== e11 && e11 instanceof eh;
        })(t10) && t10.bubble ? e10.setAttribute("next.bubble", true) : (t10 && (e10.recordException(t10), e10.setAttribute("error.type", t10.name)), e10.setStatus({ code: ec.ERROR, message: null == t10 ? void 0 : t10.message })), e10.end();
      }, ef = /* @__PURE__ */ new Map(), em = t.createContextKey("next.rootSpanId"), eg = 0, ey = { set(e10, t10, r10) {
        e10.push({ key: t10, value: r10 });
      } };
      class e_ {
        getTracerInstance() {
          return el.getTracer("next.js", "0.0.1");
        }
        getContext() {
          return ea;
        }
        getTracePropagationData() {
          let e10 = ea.active(), t10 = [];
          return eo.inject(e10, t10, ey), t10;
        }
        getActiveScopeSpan() {
          return el.getSpan(null == ea ? void 0 : ea.active());
        }
        withPropagatedContext(e10, t10, r10) {
          let i10 = ea.active();
          if (el.getSpanContext(i10)) return t10();
          let n10 = eo.extract(i10, e10, r10);
          return ea.with(n10, t10);
        }
        trace(...e10) {
          var t10;
          let [r10, i10, n10] = e10, { fn: s10, options: a10 } = "function" == typeof i10 ? { fn: i10, options: {} } : { fn: n10, options: { ...i10 } }, o2 = a10.spanName ?? r10;
          if (!ei.includes(r10) && "1" !== process.env.NEXT_OTEL_VERBOSE || a10.hideSpan) return s10();
          let l2 = this.getSpanContext((null == a10 ? void 0 : a10.parentSpan) ?? this.getActiveScopeSpan()), c2 = false;
          l2 ? (null == (t10 = el.getSpanContext(l2)) ? void 0 : t10.isRemote) && (c2 = true) : (l2 = (null == ea ? void 0 : ea.active()) ?? ed, c2 = true);
          let u2 = eg++;
          return a10.attributes = { "next.span_name": o2, "next.span_type": r10, ...a10.attributes }, ea.with(l2.setValue(em, u2), () => this.getTracerInstance().startActiveSpan(o2, a10, (e11) => {
            let t11 = "performance" in globalThis && "measure" in performance ? globalThis.performance.now() : void 0, i11 = () => {
              ef.delete(u2), t11 && process.env.NEXT_OTEL_PERFORMANCE_PREFIX && en.includes(r10 || "") && performance.measure(`${process.env.NEXT_OTEL_PERFORMANCE_PREFIX}:next-${(r10.split(".").pop() || "").replace(/[A-Z]/g, (e12) => "-" + e12.toLowerCase())}`, { start: t11, end: performance.now() });
            };
            c2 && ef.set(u2, new Map(Object.entries(a10.attributes ?? {})));
            try {
              if (s10.length > 1) return s10(e11, (t13) => ep(e11, t13));
              let t12 = s10(e11);
              if (es(t12)) return t12.then((t13) => (e11.end(), t13)).catch((t13) => {
                throw ep(e11, t13), t13;
              }).finally(i11);
              return e11.end(), i11(), t12;
            } catch (t12) {
              throw ep(e11, t12), i11(), t12;
            }
          }));
        }
        wrap(...e10) {
          let t10 = this, [r10, i10, n10] = 3 === e10.length ? e10 : [e10[0], {}, e10[1]];
          return ei.includes(r10) || "1" === process.env.NEXT_OTEL_VERBOSE ? function() {
            let e11 = i10;
            "function" == typeof e11 && "function" == typeof n10 && (e11 = e11.apply(this, arguments));
            let s10 = arguments.length - 1, a10 = arguments[s10];
            if ("function" != typeof a10) return t10.trace(r10, e11, () => n10.apply(this, arguments));
            {
              let i11 = t10.getContext().bind(ea.active(), a10);
              return t10.trace(r10, e11, (e12, t11) => (arguments[s10] = function(e13) {
                return null == t11 || t11(e13), i11.apply(this, arguments);
              }, n10.apply(this, arguments)));
            }
          } : n10;
        }
        startSpan(...e10) {
          let [t10, r10] = e10, i10 = this.getSpanContext((null == r10 ? void 0 : r10.parentSpan) ?? this.getActiveScopeSpan());
          return this.getTracerInstance().startSpan(t10, r10, i10);
        }
        getSpanContext(e10) {
          return e10 ? el.setSpan(ea.active(), e10) : void 0;
        }
        getRootSpanAttributes() {
          let e10 = ea.active().getValue(em);
          return ef.get(e10);
        }
        setRootSpanAttribute(e10, t10) {
          let r10 = ea.active().getValue(em), i10 = ef.get(r10);
          i10 && i10.set(e10, t10);
        }
      }
      let eb = (() => {
        let e10 = new e_();
        return () => e10;
      })(), ev = "__prerender_bypass";
      Symbol("__next_preview_data"), Symbol(ev);
      class ew {
        constructor(e10, t10, r10, i10) {
          var n10;
          let s10 = e10 && function(e11, t11) {
            let r11 = K.HeadersAdapter.from(e11.headers);
            return { isOnDemandRevalidate: r11.get("x-prerender-revalidate") === t11.previewModeId, revalidateOnlyGenerated: r11.has("x-prerender-revalidate-if-generated") };
          }(t10, e10).isOnDemandRevalidate, a10 = null == (n10 = r10.get(ev)) ? void 0 : n10.value;
          this._isEnabled = !!(!s10 && a10 && e10 && a10 === e10.previewModeId), this._previewModeId = null == e10 ? void 0 : e10.previewModeId, this._mutableCookies = i10;
        }
        get isEnabled() {
          return this._isEnabled;
        }
        enable() {
          if (!this._previewModeId) throw Object.defineProperty(Error("Invariant: previewProps missing previewModeId this should never happen"), "__NEXT_ERROR_CODE", { value: "E93", enumerable: false, configurable: true });
          this._mutableCookies.set({ name: ev, value: this._previewModeId, httpOnly: true, sameSite: "none", secure: true, path: "/" }), this._isEnabled = true;
        }
        disable() {
          this._mutableCookies.set({ name: ev, value: "", httpOnly: true, sameSite: "none", secure: true, path: "/", expires: /* @__PURE__ */ new Date(0) }), this._isEnabled = false;
        }
      }
      function ek(e10, t10) {
        if ("x-middleware-set-cookie" in e10.headers && "string" == typeof e10.headers["x-middleware-set-cookie"]) {
          let r10 = e10.headers["x-middleware-set-cookie"], i10 = new Headers();
          for (let e11 of f(r10)) i10.append("set-cookie", e11);
          for (let e11 of new N.ResponseCookies(i10).getAll()) t10.set(e11);
        }
      }
      e.i(53835);
      var eS = e.i(82453), eT = e.i(99734), eE = e.i(25753);
      e.i(7754);
      var ex = e.i(90460);
      e.i(51615);
      class eO {
        constructor(e10, t10, r10) {
          this.prev = null, this.next = null, this.key = e10, this.data = t10, this.size = r10;
        }
      }
      class eC {
        constructor() {
          this.prev = null, this.next = null;
        }
      }
      class eR {
        constructor(e10, t10) {
          this.cache = /* @__PURE__ */ new Map(), this.totalSize = 0, this.maxSize = e10, this.calculateSize = t10, this.head = new eC(), this.tail = new eC(), this.head.next = this.tail, this.tail.prev = this.head;
        }
        addToHead(e10) {
          e10.prev = this.head, e10.next = this.head.next, this.head.next.prev = e10, this.head.next = e10;
        }
        removeNode(e10) {
          e10.prev.next = e10.next, e10.next.prev = e10.prev;
        }
        moveToHead(e10) {
          this.removeNode(e10), this.addToHead(e10);
        }
        removeTail() {
          let e10 = this.tail.prev;
          return this.removeNode(e10), e10;
        }
        set(e10, t10) {
          let r10 = (null == this.calculateSize ? void 0 : this.calculateSize.call(this, t10)) ?? 1;
          if (r10 > this.maxSize) return void console.warn("Single item size exceeds maxSize");
          let i10 = this.cache.get(e10);
          if (i10) i10.data = t10, this.totalSize = this.totalSize - i10.size + r10, i10.size = r10, this.moveToHead(i10);
          else {
            let i11 = new eO(e10, t10, r10);
            this.cache.set(e10, i11), this.addToHead(i11), this.totalSize += r10;
          }
          for (; this.totalSize > this.maxSize && this.cache.size > 0; ) {
            let e11 = this.removeTail();
            this.cache.delete(e11.key), this.totalSize -= e11.size;
          }
        }
        has(e10) {
          return this.cache.has(e10);
        }
        get(e10) {
          let t10 = this.cache.get(e10);
          if (t10) return this.moveToHead(t10), t10.data;
        }
        *[Symbol.iterator]() {
          let e10 = this.head.next;
          for (; e10 && e10 !== this.tail; ) {
            let t10 = e10;
            yield [t10.key, t10.data], e10 = e10.next;
          }
        }
        remove(e10) {
          let t10 = this.cache.get(e10);
          t10 && (this.removeNode(t10), this.cache.delete(e10), this.totalSize -= t10.size);
        }
        get size() {
          return this.cache.size;
        }
        get currentSize() {
          return this.totalSize;
        }
      }
      new eR(52428800, (e10) => e10.size), process.env.NEXT_PRIVATE_DEBUG_CACHE && console.debug.bind(console, "DefaultCacheHandler:"), process.env.NEXT_PRIVATE_DEBUG_CACHE && ((e10, ...t10) => {
        console.log(`use-cache: ${e10}`, ...t10);
      }), Symbol.for("@next/cache-handlers");
      let eI = Symbol.for("@next/cache-handlers-map"), eP = Symbol.for("@next/cache-handlers-set"), eA = globalThis;
      function eN() {
        if (eA[eI]) return eA[eI].entries();
      }
      async function eU(e10, t10) {
        if (!e10) return t10();
        let r10 = eM(e10);
        try {
          return await t10();
        } finally {
          let t11 = function(e11, t12) {
            let r11 = new Set(e11.pendingRevalidatedTags), i10 = new Set(e11.pendingRevalidateWrites);
            return { pendingRevalidatedTags: t12.pendingRevalidatedTags.filter((e12) => !r11.has(e12)), pendingRevalidates: Object.fromEntries(Object.entries(t12.pendingRevalidates).filter(([t13]) => !(t13 in e11.pendingRevalidates))), pendingRevalidateWrites: t12.pendingRevalidateWrites.filter((e12) => !i10.has(e12)) };
          }(r10, eM(e10));
          await eD(e10, t11);
        }
      }
      function eM(e10) {
        return { pendingRevalidatedTags: e10.pendingRevalidatedTags ? [...e10.pendingRevalidatedTags] : [], pendingRevalidates: { ...e10.pendingRevalidates }, pendingRevalidateWrites: e10.pendingRevalidateWrites ? [...e10.pendingRevalidateWrites] : [] };
      }
      async function eL(e10, t10) {
        if (0 === e10.length) return;
        let r10 = [];
        t10 && r10.push(t10.revalidateTag(e10));
        let i10 = function() {
          if (eA[eP]) return eA[eP].values();
        }();
        if (i10) for (let t11 of i10) r10.push(t11.expireTags(...e10));
        await Promise.all(r10);
      }
      async function eD(e10, t10) {
        let r10 = (null == t10 ? void 0 : t10.pendingRevalidatedTags) ?? e10.pendingRevalidatedTags ?? [], i10 = (null == t10 ? void 0 : t10.pendingRevalidates) ?? e10.pendingRevalidates ?? {}, n10 = (null == t10 ? void 0 : t10.pendingRevalidateWrites) ?? e10.pendingRevalidateWrites ?? [];
        return Promise.all([eL(r10, e10.incrementalCache), ...Object.values(i10), ...n10]);
      }
      var eq = e.i(90044);
      e.i(44789);
      var ej = e.i(69487);
      class eH {
        constructor({ waitUntil: e10, onClose: t10, onTaskError: r10 }) {
          this.workUnitStores = /* @__PURE__ */ new Set(), this.waitUntil = e10, this.onClose = t10, this.onTaskError = r10, this.callbackQueue = new eT.default(), this.callbackQueue.pause();
        }
        after(e10) {
          if (es(e10)) this.waitUntil || eB(), this.waitUntil(e10.catch((e11) => this.reportTaskError("promise", e11)));
          else if ("function" == typeof e10) this.addCallback(e10);
          else throw Object.defineProperty(Error("`after()`: Argument must be a promise or a function"), "__NEXT_ERROR_CODE", { value: "E50", enumerable: false, configurable: true });
        }
        addCallback(e10) {
          this.waitUntil || eB();
          let t10 = eS.workUnitAsyncStorage.getStore();
          t10 && this.workUnitStores.add(t10);
          let r10 = ej.afterTaskAsyncStorage.getStore(), i10 = r10 ? r10.rootTaskSpawnPhase : null == t10 ? void 0 : t10.phase;
          this.runCallbacksOnClosePromise || (this.runCallbacksOnClosePromise = this.runCallbacksOnClose(), this.waitUntil(this.runCallbacksOnClosePromise));
          let n10 = (0, eq.bindSnapshot)(async () => {
            try {
              await ej.afterTaskAsyncStorage.run({ rootTaskSpawnPhase: i10 }, () => e10());
            } catch (e11) {
              this.reportTaskError("function", e11);
            }
          });
          this.callbackQueue.add(n10);
        }
        async runCallbacksOnClose() {
          return await new Promise((e10) => this.onClose(e10)), this.runCallbacks();
        }
        async runCallbacks() {
          if (0 === this.callbackQueue.size) return;
          for (let e11 of this.workUnitStores) e11.phase = "after";
          let e10 = ex.workAsyncStorage.getStore();
          if (!e10) throw Object.defineProperty(new eE.InvariantError("Missing workStore in AfterContext.runCallbacks"), "__NEXT_ERROR_CODE", { value: "E547", enumerable: false, configurable: true });
          return eU(e10, () => (this.callbackQueue.start(), this.callbackQueue.onIdle()));
        }
        reportTaskError(e10, t10) {
          if (console.error("promise" === e10 ? "A promise passed to `after()` rejected:" : "An error occurred in a function passed to `after()`:", t10), this.onTaskError) try {
            null == this.onTaskError || this.onTaskError.call(this, t10);
          } catch (e11) {
            console.error(Object.defineProperty(new eE.InvariantError("`onTaskError` threw while handling an error thrown from an `after` task", { cause: e11 }), "__NEXT_ERROR_CODE", { value: "E569", enumerable: false, configurable: true }));
          }
        }
      }
      function eB() {
        throw Object.defineProperty(Error("`after()` will not work correctly, because `waitUntil` is not available in the current environment."), "__NEXT_ERROR_CODE", { value: "E91", enumerable: false, configurable: true });
      }
      function ez(e10) {
        let t10, r10 = { then: (i10, n10) => (t10 || (t10 = e10()), t10.then((e11) => {
          r10.value = e11;
        }).catch(() => {
        }), t10.then(i10, n10)) };
        return r10;
      }
      class eK {
        onClose(e10) {
          if (this.isClosed) throw Object.defineProperty(Error("Cannot subscribe to a closed CloseController"), "__NEXT_ERROR_CODE", { value: "E365", enumerable: false, configurable: true });
          this.target.addEventListener("close", e10), this.listeners++;
        }
        dispatchClose() {
          if (this.isClosed) throw Object.defineProperty(Error("Cannot close a CloseController multiple times"), "__NEXT_ERROR_CODE", { value: "E229", enumerable: false, configurable: true });
          this.listeners > 0 && this.target.dispatchEvent(new Event("close")), this.isClosed = true;
        }
        constructor() {
          this.target = new EventTarget(), this.listeners = 0, this.isClosed = false;
        }
      }
      function eJ() {
        return { previewModeId: process.env.__NEXT_PREVIEW_MODE_ID || "", previewModeSigningKey: process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY || "", previewModeEncryptionKey: process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY || "" };
      }
      let e$ = Symbol.for("@next/request-context");
      async function eF(e10, t10, r10) {
        let i10 = [], n10 = r10 && r10.size > 0;
        for (let t11 of ((e11) => {
          let t12 = ["/layout"];
          if (e11.startsWith("/")) {
            let r11 = e11.split("/");
            for (let e12 = 1; e12 < r11.length + 1; e12++) {
              let i11 = r11.slice(0, e12).join("/");
              i11 && (i11.endsWith("/page") || i11.endsWith("/route") || (i11 = `${i11}${!i11.endsWith("/") ? "/" : ""}layout`), t12.push(i11));
            }
          }
          return t12;
        })(e10)) t11 = `${h}${t11}`, i10.push(t11);
        if (t10.pathname && !n10) {
          let e11 = `${h}${t10.pathname}`;
          i10.push(e11);
        }
        return { tags: i10, expirationsByCacheKind: function(e11) {
          let t11 = /* @__PURE__ */ new Map(), r11 = eN();
          if (r11) for (let [i11, n11] of r11) "getExpiration" in n11 && t11.set(i11, ez(async () => n11.getExpiration(...e11)));
          return t11;
        }(i10) };
      }
      class eW extends M {
        constructor(e10) {
          super(e10.input, e10.init), this.sourcePage = e10.page;
        }
        get request() {
          throw Object.defineProperty(new c({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        respondWith() {
          throw Object.defineProperty(new c({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        waitUntil() {
          throw Object.defineProperty(new c({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
      }
      let eV = { keys: (e10) => Array.from(e10.keys()), get: (e10, t10) => e10.get(t10) ?? void 0 }, eG = (e10, t10) => eb().withPropagatedContext(e10.headers, t10, eV), eX = false;
      async function eQ(t10) {
        var r10;
        let i10, n10;
        if (!eX && (eX = true, "true" === process.env.NEXT_PRIVATE_TEST_PROXY)) {
          let { interceptTestApis: t11, wrapRequestHandler: r11 } = e.r(94165);
          t11(), eG = r11(eG);
        }
        await o();
        let s10 = void 0 !== globalThis.__BUILD_MANIFEST;
        t10.request.url = t10.request.url.replace(/\.rsc($|\?)/, "$1");
        let a10 = t10.bypassNextUrl ? new URL(t10.request.url) : new A(t10.request.url, { headers: t10.request.headers, nextConfig: t10.request.nextConfig });
        for (let e10 of [...a10.searchParams.keys()]) {
          let t11 = a10.searchParams.getAll(e10), r11 = function(e11) {
            for (let t12 of ["nxtP", "nxtI"]) if (e11 !== t12 && e11.startsWith(t12)) return e11.substring(t12.length);
            return null;
          }(e10);
          if (r11) {
            for (let e11 of (a10.searchParams.delete(r11), t11)) a10.searchParams.append(r11, e11);
            a10.searchParams.delete(e10);
          }
        }
        let l2 = process.env.__NEXT_BUILD_ID || "";
        "buildId" in a10 && (l2 = a10.buildId || "", a10.buildId = "");
        let c2 = function(e10) {
          let t11 = new Headers();
          for (let [r11, i11] of Object.entries(e10)) for (let e11 of Array.isArray(i11) ? i11 : [i11]) void 0 !== e11 && ("number" == typeof e11 && (e11 = e11.toString()), t11.append(r11, e11));
          return t11;
        }(t10.request.headers), u2 = c2.has("x-nextjs-data"), d2 = "1" === c2.get(z.RSC_HEADER);
        u2 && "/index" === a10.pathname && (a10.pathname = "/");
        let h2 = /* @__PURE__ */ new Map();
        if (!s10) for (let e10 of z.FLIGHT_HEADERS) {
          let t11 = c2.get(e10);
          null !== t11 && (h2.set(e10, t11), c2.delete(e10));
        }
        let p2 = a10.searchParams.get(z.NEXT_RSC_UNION_QUERY), f2 = new eW({ page: t10.page, input: function(e10) {
          let t11 = "string" == typeof e10, r11 = t11 ? new URL(e10) : e10;
          return r11.searchParams.delete(z.NEXT_RSC_UNION_QUERY), t11 ? r11.toString() : r11;
        }(a10).toString(), init: { body: t10.request.body, headers: c2, method: t10.request.method, nextConfig: t10.request.nextConfig, signal: t10.request.signal } });
        u2 && Object.defineProperty(f2, "__isData", { enumerable: false, value: true }), !globalThis.__incrementalCacheShared && t10.IncrementalCache && (globalThis.__incrementalCache = new t10.IncrementalCache({ CurCacheHandler: t10.incrementalCacheHandler, minimalMode: true, fetchCacheKeyPrefix: "", dev: false, requestHeaders: t10.request.headers, getPrerenderManifest: () => ({ version: -1, routes: {}, dynamicRoutes: {}, notFoundRoutes: [], preview: eJ() }) }));
        let m2 = t10.request.waitUntil ?? (null == (r10 = function() {
          let e10 = globalThis[e$];
          return null == e10 ? void 0 : e10.get();
        }()) ? void 0 : r10.waitUntil), g2 = new w({ request: f2, page: t10.page, context: m2 ? { waitUntil: m2 } : void 0 });
        if ((i10 = await eG(f2, () => {
          if ("/middleware" === t10.page || "/src/middleware" === t10.page) {
            let e10 = g2.waitUntil.bind(g2), r11 = new eK();
            return eb().trace(er.execute, { spanName: `middleware ${f2.method} ${f2.nextUrl.pathname}`, attributes: { "http.target": f2.nextUrl.pathname, "http.method": f2.method } }, async () => {
              try {
                var i11, s11, a11, o2, c3, u3;
                let d3 = eJ(), h3 = await eF("/", f2.nextUrl, null), p3 = (c3 = f2.nextUrl, u3 = (e11) => {
                  n10 = e11;
                }, function(e11, t11, r12, i12, n11, s12, a12, o3, l3, c4, u4, d4) {
                  function h4(e12) {
                    r12 && r12.setHeader("Set-Cookie", e12);
                  }
                  let p4 = {};
                  return { type: "request", phase: e11, implicitTags: s12, url: { pathname: i12.pathname, search: i12.search ?? "" }, rootParams: n11, get headers() {
                    return p4.headers || (p4.headers = function(e12) {
                      let t12 = K.HeadersAdapter.from(e12);
                      for (let e13 of z.FLIGHT_HEADERS) t12.delete(e13);
                      return K.HeadersAdapter.seal(t12);
                    }(t11.headers)), p4.headers;
                  }, get cookies() {
                    if (!p4.cookies) {
                      let e12 = new N.RequestCookies(K.HeadersAdapter.from(t11.headers));
                      ek(t11, e12), p4.cookies = J.RequestCookiesAdapter.seal(e12);
                    }
                    return p4.cookies;
                  }, set cookies(value) {
                    p4.cookies = value;
                  }, get mutableCookies() {
                    if (!p4.mutableCookies) {
                      let e12 = function(e13, t12) {
                        let r13 = new N.RequestCookies(K.HeadersAdapter.from(e13));
                        return J.MutableRequestCookiesAdapter.wrap(r13, t12);
                      }(t11.headers, a12 || (r12 ? h4 : void 0));
                      ek(t11, e12), p4.mutableCookies = e12;
                    }
                    return p4.mutableCookies;
                  }, get userspaceMutableCookies() {
                    return p4.userspaceMutableCookies || (p4.userspaceMutableCookies = (0, J.createCookiesWithMutableAccessCheck)(this)), p4.userspaceMutableCookies;
                  }, get draftMode() {
                    return p4.draftMode || (p4.draftMode = new ew(l3, t11, this.cookies, this.mutableCookies)), p4.draftMode;
                  }, renderResumeDataCache: o3 ?? null, isHmrRefresh: c4, serverComponentsHmrCache: u4 || globalThis.__serverComponentsHmrCache, devFallbackParams: null };
                }("action", f2, void 0, c3, {}, h3, u3, void 0, d3, false, void 0, null)), m3 = function({ page: e11, renderOpts: t11, isPrefetchRequest: r12, buildId: i12, previouslyRevalidatedTags: n11 }) {
                  var s12;
                  let a12 = !t11.shouldWaitOnAllReady && !t11.supportsDynamicResponse && !t11.isDraftMode && !t11.isPossibleServerAction, o3 = t11.dev ?? false, l3 = o3 || a12 && (!!process.env.NEXT_DEBUG_BUILD || "1" === process.env.NEXT_SSG_FETCH_METRICS), c4 = { isStaticGeneration: a12, page: e11, route: (s12 = e11.split("/").reduce((e12, t12, r13, i13) => t12 ? "(" === t12[0] && t12.endsWith(")") || "@" === t12[0] || ("page" === t12 || "route" === t12) && r13 === i13.length - 1 ? e12 : e12 + "/" + t12 : e12, "")).startsWith("/") ? s12 : "/" + s12, incrementalCache: t11.incrementalCache || globalThis.__incrementalCache, cacheLifeProfiles: t11.cacheLifeProfiles, isRevalidate: t11.isRevalidate, isBuildTimePrerendering: t11.nextExport, hasReadableErrorStacks: t11.hasReadableErrorStacks, fetchCache: t11.fetchCache, isOnDemandRevalidate: t11.isOnDemandRevalidate, isDraftMode: t11.isDraftMode, isPrefetchRequest: r12, buildId: i12, reactLoadableManifest: (null == t11 ? void 0 : t11.reactLoadableManifest) || {}, assetPrefix: (null == t11 ? void 0 : t11.assetPrefix) || "", afterContext: function(e12) {
                    let { waitUntil: t12, onClose: r13, onAfterTaskError: i13 } = e12;
                    return new eH({ waitUntil: t12, onClose: r13, onTaskError: i13 });
                  }(t11), cacheComponentsEnabled: t11.experimental.cacheComponents, dev: o3, previouslyRevalidatedTags: n11, refreshTagsByCacheKind: function() {
                    let e12 = /* @__PURE__ */ new Map(), t12 = eN();
                    if (t12) for (let [r13, i13] of t12) "refreshTags" in i13 && e12.set(r13, ez(async () => i13.refreshTags()));
                    return e12;
                  }(), runInCleanSnapshot: (0, eq.createSnapshot)(), shouldTrackFetchMetrics: l3 };
                  return t11.store = c4, c4;
                }({ page: "/", renderOpts: { cacheLifeProfiles: null == (s11 = t10.request.nextConfig) || null == (i11 = s11.experimental) ? void 0 : i11.cacheLife, experimental: { isRoutePPREnabled: false, cacheComponents: false, authInterrupts: !!(null == (o2 = t10.request.nextConfig) || null == (a11 = o2.experimental) ? void 0 : a11.authInterrupts) }, supportsDynamicResponse: true, waitUntil: e10, onClose: r11.onClose.bind(r11), onAfterTaskError: void 0 }, isPrefetchRequest: "1" === f2.headers.get(z.NEXT_ROUTER_PREFETCH_HEADER), buildId: l2 ?? "", previouslyRevalidatedTags: [] });
                return await ex.workAsyncStorage.run(m3, () => eS.workUnitAsyncStorage.run(p3, t10.handler, f2, g2));
              } finally {
                setTimeout(() => {
                  r11.dispatchClose();
                }, 0);
              }
            });
          }
          return t10.handler(f2, g2);
        })) && !(i10 instanceof Response)) throw Object.defineProperty(TypeError("Expected an instance of Response to be returned"), "__NEXT_ERROR_CODE", { value: "E567", enumerable: false, configurable: true });
        i10 && n10 && i10.headers.set("set-cookie", n10);
        let y2 = null == i10 ? void 0 : i10.headers.get("x-middleware-rewrite");
        if (i10 && y2 && (d2 || !s10)) {
          let e10 = new A(y2, { forceLocale: true, headers: t10.request.headers, nextConfig: t10.request.nextConfig });
          s10 || e10.host !== f2.nextUrl.host || (e10.buildId = l2 || e10.buildId, i10.headers.set("x-middleware-rewrite", String(e10)));
          let { url: r11, isRelative: n11 } = B(e10.toString(), a10.toString());
          !s10 && u2 && i10.headers.set("x-nextjs-rewrite", r11), d2 && n11 && (a10.pathname !== e10.pathname && i10.headers.set(z.NEXT_REWRITTEN_PATH_HEADER, e10.pathname), a10.search !== e10.search && i10.headers.set(z.NEXT_REWRITTEN_QUERY_HEADER, e10.search.slice(1)));
        }
        if (i10 && y2 && d2 && p2) {
          let e10 = new URL(y2);
          e10.searchParams.has(z.NEXT_RSC_UNION_QUERY) || (e10.searchParams.set(z.NEXT_RSC_UNION_QUERY, p2), i10.headers.set("x-middleware-rewrite", e10.toString()));
        }
        let _2 = null == i10 ? void 0 : i10.headers.get("Location");
        if (i10 && _2 && !s10) {
          let e10 = new A(_2, { forceLocale: false, headers: t10.request.headers, nextConfig: t10.request.nextConfig });
          i10 = new Response(i10.body, i10), e10.host === a10.host && (e10.buildId = l2 || e10.buildId, i10.headers.set("Location", e10.toString())), u2 && (i10.headers.delete("Location"), i10.headers.set("x-nextjs-redirect", B(e10.toString(), a10.toString()).url));
        }
        let v2 = i10 || H.next(), k2 = v2.headers.get("x-middleware-override-headers"), S2 = [];
        if (k2) {
          for (let [e10, t11] of h2) v2.headers.set(`x-middleware-request-${e10}`, t11), S2.push(e10);
          S2.length > 0 && v2.headers.set("x-middleware-override-headers", k2 + "," + S2.join(","));
        }
        return { response: v2, waitUntil: ("internal" === g2[b].kind ? Promise.all(g2[b].promises).then(() => {
        }) : void 0) ?? Promise.resolve(), fetchMetrics: f2.fetchMetrics };
      }
      e.s(["config", () => ox, "default", () => oE], 99446);
      var eY = [".lcl.dev", ".lclstage.dev", ".lclclerk.com"], eZ = [".accounts.dev", ".accountsstage.dev", ".accounts.lclclerk.com"], e0 = [".lcl.dev", ".stg.dev", ".lclstage.dev", ".stgstage.dev", ".dev.lclclerk.com", ".stg.lclclerk.com", ".accounts.lclclerk.com", "accountsstage.dev", "accounts.dev"], e1 = [".lcl.dev", "lclstage.dev", ".lclclerk.com", ".accounts.lclclerk.com"], e2 = [".accountsstage.dev"], e4 = "https://api.clerk.com";
      Object.getOwnPropertyDescriptor, Object.getOwnPropertyNames, Object.prototype.hasOwnProperty;
      var e5 = (e10) => {
        throw TypeError(e10);
      }, e3 = (e10, t10, r10) => t10.has(e10) || e5("Cannot " + r10), e6 = (e10, t10, r10) => (e3(e10, t10, "read from private field"), r10 ? r10.call(e10) : t10.get(e10)), e9 = (e10, t10, r10) => t10.has(e10) ? e5("Cannot add the same private member more than once") : t10 instanceof WeakSet ? t10.add(e10) : t10.set(e10, r10), e8 = (e10, t10, r10, i10) => (e3(e10, t10, "write to private field"), i10 ? i10.call(e10, r10) : t10.set(e10, r10), r10), e7 = (e10, t10, r10) => (e3(e10, t10, "access private method"), r10), te = { initialDelay: 125, maxDelayBetweenRetries: 0, factor: 2, shouldRetry: (e10, t10) => t10 < 5, retryImmediately: false, jitter: true }, tt = async (e10) => new Promise((t10) => setTimeout(t10, e10)), tr = (e10, t10) => t10 ? e10 * (1 + Math.random()) : e10, ti = async (e10, t10 = {}) => {
        let r10 = 0, { shouldRetry: i10, initialDelay: n10, maxDelayBetweenRetries: s10, factor: a10, retryImmediately: o2, jitter: l2 } = { ...te, ...t10 }, c2 = /* @__PURE__ */ ((e11) => {
          let t11 = 0;
          return async () => {
            await tt((() => {
              let r11 = e11.initialDelay * Math.pow(e11.factor, t11);
              return r11 = tr(r11, e11.jitter), Math.min(e11.maxDelayBetweenRetries || r11, r11);
            })()), t11++;
          };
        })({ initialDelay: n10, maxDelayBetweenRetries: s10, factor: a10, jitter: l2 });
        for (; ; ) try {
          return await e10();
        } catch (e11) {
          if (!i10(e11, ++r10)) throw e11;
          o2 && 1 === r10 ? await tt(tr(100, l2)) : await c2();
        }
      }, tn = (t10) => "undefined" != typeof atob && "function" == typeof atob ? atob(t10) : e.g.Buffer ? new e.g.Buffer(t10, "base64").toString() : t10, ts = "pk_live_";
      function ta(e10) {
        if (!e10.endsWith("$")) return false;
        let t10 = e10.slice(0, -1);
        return !t10.includes("$") && t10.includes(".");
      }
      function to(e10, t10 = {}) {
        let r10;
        if (!(e10 = e10 || "") || !tl(e10)) {
          if (t10.fatal && !e10) throw Error("Publishable key is missing. Ensure that your publishable key is correctly configured. Double-check your environment configuration for your keys, or access them here: https://dashboard.clerk.com/last-active?path=api-keys");
          if (t10.fatal && !tl(e10)) throw Error("Publishable key not valid.");
          return null;
        }
        let i10 = e10.startsWith(ts) ? "production" : "development";
        try {
          r10 = tn(e10.split("_")[2]);
        } catch {
          if (t10.fatal) throw Error("Publishable key not valid: Failed to decode key.");
          return null;
        }
        if (!ta(r10)) {
          if (t10.fatal) throw Error("Publishable key not valid: Decoded key has invalid format.");
          return null;
        }
        let n10 = r10.slice(0, -1);
        return t10.proxyUrl ? n10 = t10.proxyUrl : "development" !== i10 && t10.domain && t10.isSatellite && (n10 = `clerk.${t10.domain}`), { instanceType: i10, frontendApi: n10 };
      }
      function tl(e10 = "") {
        try {
          if (!(e10.startsWith(ts) || e10.startsWith("pk_test_"))) return false;
          let t10 = e10.split("_");
          if (3 !== t10.length) return false;
          let r10 = t10[2];
          if (!r10) return false;
          let i10 = tn(r10);
          return ta(i10);
        } catch {
          return false;
        }
      }
      function tc(e10) {
        return e10.startsWith("test_") || e10.startsWith("sk_test_");
      }
      async function tu(t10, r10 = globalThis.crypto.subtle) {
        var i10;
        let n10 = new TextEncoder().encode(t10);
        return (i10 = String.fromCharCode(...new Uint8Array(await r10.digest("sha-1", n10))), "undefined" != typeof btoa && "function" == typeof btoa ? btoa(i10) : e.g.Buffer ? new e.g.Buffer(i10).toString("base64") : i10).replace(/\+/gi, "-").replace(/\//gi, "_").substring(0, 8);
      }
      var td = () => {
        try {
          return true;
        } catch {
        }
        return false;
      }, th = /* @__PURE__ */ new Set();
      function tp(e10) {
        return { code: e10.code, message: e10.message, longMessage: e10.long_message, meta: { paramName: e10?.meta?.param_name, sessionId: e10?.meta?.session_id, emailAddresses: e10?.meta?.email_addresses, identifiers: e10?.meta?.identifiers, zxcvbn: e10?.meta?.zxcvbn, plan: e10?.meta?.plan, isPlanUpgradePossible: e10?.meta?.is_plan_upgrade_possible } };
      }
      var tf = class e10 extends Error {
        constructor(t10, { data: r10, status: i10, clerkTraceId: n10, retryAfter: s10 }) {
          super(t10), this.toString = () => {
            let e11 = `[${this.name}]
Message:${this.message}
Status:${this.status}
Serialized errors: ${this.errors.map((e12) => JSON.stringify(e12))}`;
            return this.clerkTraceId && (e11 += `
Clerk Trace ID: ${this.clerkTraceId}`), e11;
          }, Object.setPrototypeOf(this, e10.prototype), this.status = i10, this.message = t10, this.clerkTraceId = n10, this.retryAfter = s10, this.clerkError = true, this.errors = function(e11 = []) {
            return e11.length > 0 ? e11.map(tp) : [];
          }(r10);
        }
      }, tm = Object.freeze({ InvalidProxyUrlErrorMessage: "The proxyUrl passed to Clerk is invalid. The expected value for proxyUrl is an absolute URL or a relative path with a leading '/'. (key={{url}})", InvalidPublishableKeyErrorMessage: "The publishableKey passed to Clerk is invalid. You can get your Publishable key at https://dashboard.clerk.com/last-active?path=api-keys. (key={{key}})", MissingPublishableKeyErrorMessage: "Missing publishableKey. You can get your key at https://dashboard.clerk.com/last-active?path=api-keys.", MissingSecretKeyErrorMessage: "Missing secretKey. You can get your key at https://dashboard.clerk.com/last-active?path=api-keys.", MissingClerkProvider: "{{source}} can only be used within the <ClerkProvider /> component. Learn more: https://clerk.com/docs/components/clerk-provider" });
      function tg({ packageName: e10, customMessages: t10 }) {
        let r10 = e10;
        function i10(e11, t11) {
          if (!t11) return `${r10}: ${e11}`;
          let i11 = e11;
          for (let r11 of e11.matchAll(/{{([a-zA-Z0-9-_]+)}}/g)) {
            let e12 = (t11[r11[1]] || "").toString();
            i11 = i11.replace(`{{${r11[1]}}}`, e12);
          }
          return `${r10}: ${i11}`;
        }
        let n10 = { ...tm, ...t10 };
        return { setPackageName({ packageName: e11 }) {
          return "string" == typeof e11 && (r10 = e11), this;
        }, setMessages({ customMessages: e11 }) {
          return Object.assign(n10, e11 || {}), this;
        }, throwInvalidPublishableKeyError(e11) {
          throw Error(i10(n10.InvalidPublishableKeyErrorMessage, e11));
        }, throwInvalidProxyUrl(e11) {
          throw Error(i10(n10.InvalidProxyUrlErrorMessage, e11));
        }, throwMissingPublishableKeyError() {
          throw Error(i10(n10.MissingPublishableKeyErrorMessage));
        }, throwMissingSecretKeyError() {
          throw Error(i10(n10.MissingSecretKeyErrorMessage));
        }, throwMissingClerkProviderError(e11) {
          throw Error(i10(n10.MissingClerkProvider, e11));
        }, throw(e11) {
          throw Error(i10(e11));
        } };
      }
      var ty = tg({ packageName: "@clerk/backend" }), { isDevOrStagingUrl: t_ } = /* @__PURE__ */ function() {
        let e10 = /* @__PURE__ */ new Map();
        return { isDevOrStagingUrl: (t10) => {
          if (!t10) return false;
          let r10 = "string" == typeof t10 ? t10 : t10.hostname, i10 = e10.get(r10);
          return void 0 === i10 && (i10 = e0.some((e11) => r10.endsWith(e11)), e10.set(r10, i10)), i10;
        } };
      }(), tb = { InvalidSecretKey: "clerk_key_invalid" }, tv = { TokenExpired: "token-expired", TokenInvalid: "token-invalid", TokenInvalidAlgorithm: "token-invalid-algorithm", TokenInvalidAuthorizedParties: "token-invalid-authorized-parties", TokenInvalidSignature: "token-invalid-signature", TokenNotActiveYet: "token-not-active-yet", TokenIatInTheFuture: "token-iat-in-the-future", TokenVerificationFailed: "token-verification-failed", InvalidSecretKey: "secret-key-invalid", LocalJWKMissing: "jwk-local-missing", RemoteJWKFailedToLoad: "jwk-remote-failed-to-load", JWKFailedToResolve: "jwk-failed-to-resolve", JWKKidMismatch: "jwk-kid-mismatch" }, tw = { ContactSupport: "Contact support@clerk.com", EnsureClerkJWT: "Make sure that this is a valid Clerk generate JWT.", SetClerkJWTKey: "Set the CLERK_JWT_KEY environment variable.", SetClerkSecretKey: "Set the CLERK_SECRET_KEY environment variable." }, tk = class e10 extends Error {
        constructor({ action: t10, message: r10, reason: i10 }) {
          super(r10), Object.setPrototypeOf(this, e10.prototype), this.reason = i10, this.message = r10, this.action = t10;
        }
        getFullMessage() {
          return `${[this.message, this.action].filter((e11) => e11).join(" ")} (reason=${this.reason}, token-carrier=${this.tokenCarrier})`;
        }
      }, tS = { TokenInvalid: "token-invalid", InvalidSecretKey: "secret-key-invalid", UnexpectedError: "unexpected-error" }, tT = class e10 extends Error {
        constructor({ message: t10, code: r10, status: i10 }) {
          super(t10), Object.setPrototypeOf(this, e10.prototype), this.code = r10, this.status = i10;
        }
        getFullMessage() {
          return `${this.message} (code=${this.code}, status=${this.status})`;
        }
      };
      let tE = crypto;
      var tx = fetch.bind(globalThis), tO = { crypto: tE, get fetch() {
        return tx;
      }, AbortController: globalThis.AbortController, Blob: globalThis.Blob, FormData: globalThis.FormData, Headers: globalThis.Headers, Request: globalThis.Request, Response: globalThis.Response }, tC = { parse: (e10, t10) => function(e11, t11, r10 = {}) {
        if (!t11.codes) {
          t11.codes = {};
          for (let e12 = 0; e12 < t11.chars.length; ++e12) t11.codes[t11.chars[e12]] = e12;
        }
        if (!r10.loose && e11.length * t11.bits & 7) throw SyntaxError("Invalid padding");
        let i10 = e11.length;
        for (; "=" === e11[i10 - 1]; ) if (--i10, !r10.loose && !((e11.length - i10) * t11.bits & 7)) throw SyntaxError("Invalid padding");
        let n10 = new (r10.out ?? Uint8Array)(i10 * t11.bits / 8 | 0), s10 = 0, a10 = 0, o2 = 0;
        for (let r11 = 0; r11 < i10; ++r11) {
          let i11 = t11.codes[e11[r11]];
          if (void 0 === i11) throw SyntaxError("Invalid character " + e11[r11]);
          a10 = a10 << t11.bits | i11, (s10 += t11.bits) >= 8 && (s10 -= 8, n10[o2++] = 255 & a10 >> s10);
        }
        if (s10 >= t11.bits || 255 & a10 << 8 - s10) throw SyntaxError("Unexpected end of data");
        return n10;
      }(e10, tR, t10) }, tR = { chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", bits: 6 }, tI = { RS256: "SHA-256", RS384: "SHA-384", RS512: "SHA-512" }, tP = "RSASSA-PKCS1-v1_5", tA = { RS256: tP, RS384: tP, RS512: tP }, tN = Object.keys(tI), tU = (e10) => {
        if (void 0 !== e10 && "JWT" !== e10) throw new tk({ action: tw.EnsureClerkJWT, reason: tv.TokenInvalid, message: `Invalid JWT type ${JSON.stringify(e10)}. Expected "JWT".` });
      }, tM = (e10) => {
        if (!tN.includes(e10)) throw new tk({ action: tw.EnsureClerkJWT, reason: tv.TokenInvalidAlgorithm, message: `Invalid JWT algorithm ${JSON.stringify(e10)}. Supported: ${tN}.` });
      };
      async function tL(e10, t10) {
        let { header: r10, signature: i10, raw: n10 } = e10, s10 = new TextEncoder().encode([n10.header, n10.payload].join(".")), a10 = function(e11) {
          let t11 = tI[e11], r11 = tA[e11];
          if (!t11 || !r11) throw Error(`Unsupported algorithm ${e11}, expected one of ${tN.join(",")}.`);
          return { hash: { name: tI[e11] }, name: tA[e11] };
        }(r10.alg);
        try {
          let e11 = await function(e12, t11, r11) {
            if ("object" == typeof e12) return tO.crypto.subtle.importKey("jwk", e12, t11, false, [r11]);
            let i11 = function(e13) {
              let t12 = tn(e13.replace(/-----BEGIN.*?-----/g, "").replace(/-----END.*?-----/g, "").replace(/\s/g, "")), r12 = new Uint8Array(new ArrayBuffer(t12.length));
              for (let e14 = 0, i12 = t12.length; e14 < i12; e14++) r12[e14] = t12.charCodeAt(e14);
              return r12;
            }(e12), n11 = "sign" === r11 ? "pkcs8" : "spki";
            return tO.crypto.subtle.importKey(n11, i11, t11, false, [r11]);
          }(t10, a10, "verify");
          return { data: await tO.crypto.subtle.verify(a10.name, e11, i10, s10) };
        } catch (e11) {
          return { errors: [new tk({ reason: tv.TokenInvalidSignature, message: e11?.message })] };
        }
      }
      function tD(e10) {
        let t10 = (e10 || "").toString().split(".");
        if (3 !== t10.length) return { errors: [new tk({ reason: tv.TokenInvalid, message: "Invalid JWT form. A JWT consists of three parts separated by dots." })] };
        let [r10, i10, n10] = t10, s10 = new TextDecoder(), a10 = JSON.parse(s10.decode(tC.parse(r10, { loose: true }))), o2 = JSON.parse(s10.decode(tC.parse(i10, { loose: true })));
        return { data: { header: a10, payload: o2, signature: tC.parse(n10, { loose: true }), raw: { header: r10, payload: i10, signature: n10, text: e10 } } };
      }
      async function tq(e10, t10) {
        let { audience: r10, authorizedParties: i10, clockSkewInMs: n10, key: s10 } = t10, a10 = n10 || 5e3, { data: o2, errors: l2 } = tD(e10);
        if (l2) return { errors: l2 };
        let { header: c2, payload: u2 } = o2;
        try {
          let { typ: e11, alg: t11 } = c2;
          tU(e11), tM(t11);
          let { azp: n11, sub: s11, aud: o3, iat: l3, exp: d3, nbf: h3 } = u2;
          if ("string" != typeof s11) throw new tk({ action: tw.EnsureClerkJWT, reason: tv.TokenVerificationFailed, message: `Subject claim (sub) is required and must be a string. Received ${JSON.stringify(s11)}.` });
          ((e12, t12) => {
            let r11 = [t12].flat().filter((e13) => !!e13), i11 = [e12].flat().filter((e13) => !!e13);
            if (r11.length > 0 && i11.length > 0) if ("string" == typeof e12) {
              if (!r11.includes(e12)) throw new tk({ action: tw.EnsureClerkJWT, reason: tv.TokenVerificationFailed, message: `Invalid JWT audience claim (aud) ${JSON.stringify(e12)}. Is not included in "${JSON.stringify(r11)}".` });
            } else {
              let t13;
              if (t13 = e12, Array.isArray(t13) && t13.length > 0 && t13.every((e13) => "string" == typeof e13) && !e12.some((e13) => r11.includes(e13))) throw new tk({ action: tw.EnsureClerkJWT, reason: tv.TokenVerificationFailed, message: `Invalid JWT audience claim array (aud) ${JSON.stringify(e12)}. Is not included in "${JSON.stringify(r11)}".` });
            }
          })([o3], [r10]);
          if (n11 && i10 && 0 !== i10.length && !i10.includes(n11)) throw new tk({ reason: tv.TokenInvalidAuthorizedParties, message: `Invalid JWT Authorized party claim (azp) ${JSON.stringify(n11)}. Expected "${i10}".` });
          if ("number" != typeof d3) throw new tk({ action: tw.EnsureClerkJWT, reason: tv.TokenVerificationFailed, message: `Invalid JWT expiry date claim (exp) ${JSON.stringify(d3)}. Expected number.` });
          let p2 = new Date(Date.now()), f2 = /* @__PURE__ */ new Date(0);
          if (f2.setUTCSeconds(d3), f2.getTime() <= p2.getTime() - a10) throw new tk({ reason: tv.TokenExpired, message: `JWT is expired. Expiry date: ${f2.toUTCString()}, Current date: ${p2.toUTCString()}.` });
          ((e12, t12) => {
            if (void 0 === e12) return;
            if ("number" != typeof e12) throw new tk({ action: tw.EnsureClerkJWT, reason: tv.TokenVerificationFailed, message: `Invalid JWT not before date claim (nbf) ${JSON.stringify(e12)}. Expected number.` });
            let r11 = new Date(Date.now()), i11 = /* @__PURE__ */ new Date(0);
            if (i11.setUTCSeconds(e12), i11.getTime() > r11.getTime() + t12) throw new tk({ reason: tv.TokenNotActiveYet, message: `JWT cannot be used prior to not before date claim (nbf). Not before date: ${i11.toUTCString()}; Current date: ${r11.toUTCString()};` });
          })(h3, a10), ((e12, t12) => {
            if (void 0 === e12) return;
            if ("number" != typeof e12) throw new tk({ action: tw.EnsureClerkJWT, reason: tv.TokenVerificationFailed, message: `Invalid JWT issued at date claim (iat) ${JSON.stringify(e12)}. Expected number.` });
            let r11 = new Date(Date.now()), i11 = /* @__PURE__ */ new Date(0);
            if (i11.setUTCSeconds(e12), i11.getTime() > r11.getTime() + t12) throw new tk({ reason: tv.TokenIatInTheFuture, message: `JWT issued at date claim (iat) is in the future. Issued at date: ${i11.toUTCString()}; Current date: ${r11.toUTCString()};` });
          })(l3, a10);
        } catch (e11) {
          return { errors: [e11] };
        }
        let { data: d2, errors: h2 } = await tL(o2, s10);
        return h2 ? { errors: [new tk({ action: tw.EnsureClerkJWT, reason: tv.TokenVerificationFailed, message: `Error verifying JWT signature. ${h2[0]}` })] } : d2 ? { data: u2 } : { errors: [new tk({ reason: tv.TokenInvalidSignature, message: "JWT signature is invalid." })] };
      }
      var tj = (e10) => {
        throw TypeError(e10);
      }, tH = (e10, t10, r10) => (t10.has(e10) || tj("Cannot access private method"), r10);
      function tB(e10) {
        if (!e10) return "";
        let t10 = e10.replace(/clerk\.accountsstage\./, "accountsstage.").replace(/clerk\.accounts\.|clerk\./, "accounts.");
        return `https://${t10}`;
      }
      var tz = { strict_mfa: { afterMinutes: 10, level: "multi_factor" }, strict: { afterMinutes: 10, level: "second_factor" }, moderate: { afterMinutes: 60, level: "second_factor" }, lax: { afterMinutes: 1440, level: "second_factor" } }, tK = /* @__PURE__ */ new Set(["first_factor", "second_factor", "multi_factor"]), tJ = /* @__PURE__ */ new Set(["strict_mfa", "strict", "moderate", "lax"]), t$ = (e10) => e10.replace(/^(org:)*/, "org:"), tF = (e10, t10) => {
        let { org: r10, user: i10 } = tW(e10), [n10, s10] = t10.split(":"), a10 = s10 || n10;
        return "org" === n10 ? r10.includes(a10) : "user" === n10 ? i10.includes(a10) : [...r10, ...i10].includes(a10);
      }, tW = (e10) => {
        let t10 = e10 ? e10.split(",").map((e11) => e11.trim()) : [];
        return { org: t10.filter((e11) => e11.split(":")[0].includes("o")).map((e11) => e11.split(":")[1]), user: t10.filter((e11) => e11.split(":")[0].includes("u")).map((e11) => e11.split(":")[1]) };
      }, tV = e.i(99929);
      function tG(e10) {
        return e10.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
      }
      function tX(e10) {
        return e10 && e10.sensitive ? "" : "i";
      }
      function tQ(e10, t10, r10) {
        var i10;
        return e10 instanceof RegExp ? function(e11, t11) {
          if (!t11) return e11;
          for (var r11 = /\((?:\?<(.*?)>)?(?!\?)/g, i11 = 0, n10 = r11.exec(e11.source); n10; ) t11.push({ name: n10[1] || i11++, prefix: "", suffix: "", modifier: "", pattern: "" }), n10 = r11.exec(e11.source);
          return e11;
        }(e10, t10) : Array.isArray(e10) ? (i10 = e10.map(function(e11) {
          return tQ(e11, t10, r10).source;
        }), new RegExp("(?:".concat(i10.join("|"), ")"), tX(r10))) : function(e11, t11, r11) {
          void 0 === r11 && (r11 = {});
          for (var i11 = r11.strict, n10 = void 0 !== i11 && i11, s10 = r11.start, a10 = r11.end, o2 = r11.encode, l2 = void 0 === o2 ? function(e12) {
            return e12;
          } : o2, c2 = r11.delimiter, u2 = r11.endsWith, d2 = "[".concat(tG(void 0 === u2 ? "" : u2), "]|$"), h2 = "[".concat(tG(void 0 === c2 ? "/#?" : c2), "]"), p2 = void 0 === s10 || s10 ? "^" : "", f2 = 0; f2 < e11.length; f2++) {
            var m2 = e11[f2];
            if ("string" == typeof m2) p2 += tG(l2(m2));
            else {
              var g2 = tG(l2(m2.prefix)), y2 = tG(l2(m2.suffix));
              if (m2.pattern) if (t11 && t11.push(m2), g2 || y2) if ("+" === m2.modifier || "*" === m2.modifier) {
                var _2 = "*" === m2.modifier ? "?" : "";
                p2 += "(?:".concat(g2, "((?:").concat(m2.pattern, ")(?:").concat(y2).concat(g2, "(?:").concat(m2.pattern, "))*)").concat(y2, ")").concat(_2);
              } else p2 += "(?:".concat(g2, "(").concat(m2.pattern, ")").concat(y2, ")").concat(m2.modifier);
              else {
                if ("+" === m2.modifier || "*" === m2.modifier) throw TypeError('Can not repeat "'.concat(m2.name, '" without a prefix and suffix'));
                p2 += "(".concat(m2.pattern, ")").concat(m2.modifier);
              }
              else p2 += "(?:".concat(g2).concat(y2, ")").concat(m2.modifier);
            }
          }
          if (void 0 === a10 || a10) n10 || (p2 += "".concat(h2, "?")), p2 += r11.endsWith ? "(?=".concat(d2, ")") : "$";
          else {
            var b2 = e11[e11.length - 1], v2 = "string" == typeof b2 ? h2.indexOf(b2[b2.length - 1]) > -1 : void 0 === b2;
            n10 || (p2 += "(?:".concat(h2, "(?=").concat(d2, "))?")), v2 || (p2 += "(?=".concat(h2, "|").concat(d2, ")"));
          }
          return new RegExp(p2, tX(r11));
        }(function(e11, t11) {
          void 0 === t11 && (t11 = {});
          for (var r11 = function(e12) {
            for (var t12 = [], r12 = 0; r12 < e12.length; ) {
              var i12 = e12[r12];
              if ("*" === i12 || "+" === i12 || "?" === i12) {
                t12.push({ type: "MODIFIER", index: r12, value: e12[r12++] });
                continue;
              }
              if ("\\" === i12) {
                t12.push({ type: "ESCAPED_CHAR", index: r12++, value: e12[r12++] });
                continue;
              }
              if ("{" === i12) {
                t12.push({ type: "OPEN", index: r12, value: e12[r12++] });
                continue;
              }
              if ("}" === i12) {
                t12.push({ type: "CLOSE", index: r12, value: e12[r12++] });
                continue;
              }
              if (":" === i12) {
                for (var n11 = "", s11 = r12 + 1; s11 < e12.length; ) {
                  var a11 = e12.charCodeAt(s11);
                  if (a11 >= 48 && a11 <= 57 || a11 >= 65 && a11 <= 90 || a11 >= 97 && a11 <= 122 || 95 === a11) {
                    n11 += e12[s11++];
                    continue;
                  }
                  break;
                }
                if (!n11) throw TypeError("Missing parameter name at ".concat(r12));
                t12.push({ type: "NAME", index: r12, value: n11 }), r12 = s11;
                continue;
              }
              if ("(" === i12) {
                var o3 = 1, l3 = "", s11 = r12 + 1;
                if ("?" === e12[s11]) throw TypeError('Pattern cannot start with "?" at '.concat(s11));
                for (; s11 < e12.length; ) {
                  if ("\\" === e12[s11]) {
                    l3 += e12[s11++] + e12[s11++];
                    continue;
                  }
                  if (")" === e12[s11]) {
                    if (0 == --o3) {
                      s11++;
                      break;
                    }
                  } else if ("(" === e12[s11] && (o3++, "?" !== e12[s11 + 1])) throw TypeError("Capturing groups are not allowed at ".concat(s11));
                  l3 += e12[s11++];
                }
                if (o3) throw TypeError("Unbalanced pattern at ".concat(r12));
                if (!l3) throw TypeError("Missing pattern at ".concat(r12));
                t12.push({ type: "PATTERN", index: r12, value: l3 }), r12 = s11;
                continue;
              }
              t12.push({ type: "CHAR", index: r12, value: e12[r12++] });
            }
            return t12.push({ type: "END", index: r12, value: "" }), t12;
          }(e11), i11 = t11.prefixes, n10 = void 0 === i11 ? "./" : i11, s10 = t11.delimiter, a10 = void 0 === s10 ? "/#?" : s10, o2 = [], l2 = 0, c2 = 0, u2 = "", d2 = function(e12) {
            if (c2 < r11.length && r11[c2].type === e12) return r11[c2++].value;
          }, h2 = function(e12) {
            var t12 = d2(e12);
            if (void 0 !== t12) return t12;
            var i12 = r11[c2], n11 = i12.type, s11 = i12.index;
            throw TypeError("Unexpected ".concat(n11, " at ").concat(s11, ", expected ").concat(e12));
          }, p2 = function() {
            for (var e12, t12 = ""; e12 = d2("CHAR") || d2("ESCAPED_CHAR"); ) t12 += e12;
            return t12;
          }, f2 = function(e12) {
            for (var t12 = 0; t12 < a10.length; t12++) {
              var r12 = a10[t12];
              if (e12.indexOf(r12) > -1) return true;
            }
            return false;
          }, m2 = function(e12) {
            var t12 = o2[o2.length - 1], r12 = e12 || (t12 && "string" == typeof t12 ? t12 : "");
            if (t12 && !r12) throw TypeError('Must have text between two parameters, missing text after "'.concat(t12.name, '"'));
            return !r12 || f2(r12) ? "[^".concat(tG(a10), "]+?") : "(?:(?!".concat(tG(r12), ")[^").concat(tG(a10), "])+?");
          }; c2 < r11.length; ) {
            var g2 = d2("CHAR"), y2 = d2("NAME"), _2 = d2("PATTERN");
            if (y2 || _2) {
              var b2 = g2 || "";
              -1 === n10.indexOf(b2) && (u2 += b2, b2 = ""), u2 && (o2.push(u2), u2 = ""), o2.push({ name: y2 || l2++, prefix: b2, suffix: "", pattern: _2 || m2(b2), modifier: d2("MODIFIER") || "" });
              continue;
            }
            var v2 = g2 || d2("ESCAPED_CHAR");
            if (v2) {
              u2 += v2;
              continue;
            }
            if (u2 && (o2.push(u2), u2 = ""), d2("OPEN")) {
              var b2 = p2(), w2 = d2("NAME") || "", k2 = d2("PATTERN") || "", S2 = p2();
              h2("CLOSE"), o2.push({ name: w2 || (k2 ? l2++ : ""), pattern: w2 && !k2 ? m2(b2) : k2, prefix: b2, suffix: S2, modifier: d2("MODIFIER") || "" });
              continue;
            }
            h2("END");
          }
          return o2;
        }(e10, r10), t10, r10);
      }
      var tY = "https://api.clerk.com", tZ = "@clerk/backend@2.12.0", t0 = "2025-04-10", t1 = { Session: "__session", Refresh: "__refresh", ClientUat: "__client_uat", Handshake: "__clerk_handshake", DevBrowser: "__clerk_db_jwt", RedirectCount: "__clerk_redirect_count", HandshakeNonce: "__clerk_handshake_nonce" }, t2 = { ClerkSynced: "__clerk_synced", SuffixedCookies: "suffixed_cookies", ClerkRedirectUrl: "__clerk_redirect_url", DevBrowser: t1.DevBrowser, Handshake: t1.Handshake, HandshakeHelp: "__clerk_help", LegacyDevBrowser: "__dev_session", HandshakeReason: "__clerk_hs_reason", HandshakeNonce: t1.HandshakeNonce, HandshakeFormat: "format" }, t4 = { Cookies: t1, Headers: { Accept: "accept", AuthMessage: "x-clerk-auth-message", Authorization: "authorization", AuthReason: "x-clerk-auth-reason", AuthSignature: "x-clerk-auth-signature", AuthStatus: "x-clerk-auth-status", AuthToken: "x-clerk-auth-token", CacheControl: "cache-control", ClerkRedirectTo: "x-clerk-redirect-to", ClerkRequestData: "x-clerk-request-data", ClerkUrl: "x-clerk-clerk-url", CloudFrontForwardedProto: "cloudfront-forwarded-proto", ContentType: "content-type", ContentSecurityPolicy: "content-security-policy", ContentSecurityPolicyReportOnly: "content-security-policy-report-only", EnableDebug: "x-clerk-debug", ForwardedHost: "x-forwarded-host", ForwardedPort: "x-forwarded-port", ForwardedProto: "x-forwarded-proto", Host: "host", Location: "location", Nonce: "x-nonce", Origin: "origin", Referrer: "referer", SecFetchDest: "sec-fetch-dest", SecFetchSite: "sec-fetch-site", UserAgent: "user-agent", ReportingEndpoints: "reporting-endpoints" }, ContentTypes: { Json: "application/json" }, QueryParameters: t2 }, t5 = (e10, t10, r10, i10) => {
        if ("" === e10) return t3(t10.toString(), r10?.toString());
        let n10 = new URL(e10), s10 = r10 ? new URL(r10, n10) : void 0, a10 = new URL(t10, n10), o2 = `${n10.hostname}:${n10.port}` != `${a10.hostname}:${a10.port}`;
        return s10 && (o2 && s10.searchParams.delete(t4.QueryParameters.ClerkSynced), a10.searchParams.set("redirect_url", s10.toString())), o2 && i10 && a10.searchParams.set(t4.QueryParameters.DevBrowser, i10), a10.toString();
      }, t3 = (e10, t10) => {
        let r10;
        if (e10.startsWith("http")) r10 = new URL(e10);
        else {
          if (!t10 || !t10.startsWith("http")) throw Error("destination url or return back url should be an absolute path url!");
          let i10 = new URL(t10);
          r10 = new URL(e10, i10.origin);
        }
        return t10 && r10.searchParams.set("redirect_url", t10), r10.toString();
      };
      function t6(e10, t10) {
        return Object.keys(e10).reduce((e11, r10) => ({ ...e11, [r10]: t10[r10] || e11[r10] }), { ...e10 });
      }
      function t9(e10) {
        if (!e10 || "string" != typeof e10) throw Error("Missing Clerk Secret Key. Go to https://dashboard.clerk.com and get your key for your instance.");
      }
      var t8 = { SessionToken: "session_token", ApiKey: "api_key", M2MToken: "m2m_token", OAuthToken: "oauth_token" }, t7 = class {
        constructor(e10, t10, r10) {
          this.cookieSuffix = e10, this.clerkRequest = t10, this.originalFrontendApi = "", r10.acceptsToken === t8.M2MToken || r10.acceptsToken === t8.ApiKey ? this.initHeaderValues() : (this.initPublishableKeyValues(r10), this.initHeaderValues(), this.initCookieValues(), this.initHandshakeValues()), Object.assign(this, r10), this.clerkUrl = this.clerkRequest.clerkUrl;
        }
        get sessionToken() {
          return this.sessionTokenInCookie || this.tokenInHeader;
        }
        usesSuffixedCookies() {
          let e10 = this.getSuffixedCookie(t4.Cookies.ClientUat), t10 = this.getCookie(t4.Cookies.ClientUat), r10 = this.getSuffixedCookie(t4.Cookies.Session) || "", i10 = this.getCookie(t4.Cookies.Session) || "";
          if (i10 && !this.tokenHasIssuer(i10)) return false;
          if (i10 && !this.tokenBelongsToInstance(i10)) return true;
          if (!e10 && !r10) return false;
          let { data: n10 } = tD(i10), s10 = n10?.payload.iat || 0, { data: a10 } = tD(r10), o2 = a10?.payload.iat || 0;
          if ("0" !== e10 && "0" !== t10 && s10 > o2 || "0" === e10 && "0" !== t10) return false;
          if ("production" !== this.instanceType) {
            let r11 = this.sessionExpired(a10);
            if ("0" !== e10 && "0" === t10 && r11) return false;
          }
          return !!e10 || !r10;
        }
        isCrossOriginReferrer() {
          if (!this.referrer || !this.clerkUrl.origin) return false;
          try {
            return new URL(this.referrer).origin !== this.clerkUrl.origin;
          } catch {
            return false;
          }
        }
        isKnownClerkReferrer() {
          if (!this.referrer) return false;
          try {
            let e10 = new URL(this.referrer), t10 = e10.hostname;
            if (this.frontendApi) {
              let e11 = this.frontendApi.startsWith("http") ? new URL(this.frontendApi).hostname : this.frontendApi;
              if (t10 === e11) return true;
            }
            if (eY.some((e11) => t10.startsWith("accounts.") && t10.endsWith(e11)) || eZ.some((e11) => t10.endsWith(e11) && !t10.endsWith(".clerk" + e11))) return true;
            let r10 = tB(this.frontendApi);
            if (r10) {
              let t11 = new URL(r10).origin;
              if (e10.origin === t11) return true;
            }
            if (t10.startsWith("accounts.")) return true;
            return false;
          } catch {
            return false;
          }
        }
        initPublishableKeyValues(e10) {
          to(e10.publishableKey, { fatal: true }), this.publishableKey = e10.publishableKey;
          let t10 = to(this.publishableKey, { fatal: true, domain: e10.domain, isSatellite: e10.isSatellite });
          this.originalFrontendApi = t10.frontendApi;
          let r10 = to(this.publishableKey, { fatal: true, proxyUrl: e10.proxyUrl, domain: e10.domain, isSatellite: e10.isSatellite });
          this.instanceType = r10.instanceType, this.frontendApi = r10.frontendApi;
        }
        initHeaderValues() {
          this.tokenInHeader = this.parseAuthorizationHeader(this.getHeader(t4.Headers.Authorization)), this.origin = this.getHeader(t4.Headers.Origin), this.host = this.getHeader(t4.Headers.Host), this.forwardedHost = this.getHeader(t4.Headers.ForwardedHost), this.forwardedProto = this.getHeader(t4.Headers.CloudFrontForwardedProto) || this.getHeader(t4.Headers.ForwardedProto), this.referrer = this.getHeader(t4.Headers.Referrer), this.userAgent = this.getHeader(t4.Headers.UserAgent), this.secFetchDest = this.getHeader(t4.Headers.SecFetchDest), this.accept = this.getHeader(t4.Headers.Accept);
        }
        initCookieValues() {
          this.sessionTokenInCookie = this.getSuffixedOrUnSuffixedCookie(t4.Cookies.Session), this.refreshTokenInCookie = this.getSuffixedCookie(t4.Cookies.Refresh), this.clientUat = Number.parseInt(this.getSuffixedOrUnSuffixedCookie(t4.Cookies.ClientUat) || "") || 0;
        }
        initHandshakeValues() {
          this.devBrowserToken = this.getQueryParam(t4.QueryParameters.DevBrowser) || this.getSuffixedOrUnSuffixedCookie(t4.Cookies.DevBrowser), this.handshakeToken = this.getQueryParam(t4.QueryParameters.Handshake) || this.getCookie(t4.Cookies.Handshake), this.handshakeRedirectLoopCounter = Number(this.getCookie(t4.Cookies.RedirectCount)) || 0, this.handshakeNonce = this.getQueryParam(t4.QueryParameters.HandshakeNonce) || this.getCookie(t4.Cookies.HandshakeNonce);
        }
        getQueryParam(e10) {
          return this.clerkRequest.clerkUrl.searchParams.get(e10);
        }
        getHeader(e10) {
          return this.clerkRequest.headers.get(e10) || void 0;
        }
        getCookie(e10) {
          return this.clerkRequest.cookies.get(e10) || void 0;
        }
        getSuffixedCookie(e10) {
          let t10;
          return this.getCookie((t10 = this.cookieSuffix, `${e10}_${t10}`)) || void 0;
        }
        getSuffixedOrUnSuffixedCookie(e10) {
          return this.usesSuffixedCookies() ? this.getSuffixedCookie(e10) : this.getCookie(e10);
        }
        parseAuthorizationHeader(e10) {
          if (!e10) return;
          let [t10, r10] = e10.split(" ", 2);
          return r10 ? "Bearer" === t10 ? r10 : void 0 : t10;
        }
        tokenHasIssuer(e10) {
          let { data: t10, errors: r10 } = tD(e10);
          return !r10 && !!t10.payload.iss;
        }
        tokenBelongsToInstance(e10) {
          if (!e10) return false;
          let { data: t10, errors: r10 } = tD(e10);
          if (r10) return false;
          let i10 = t10.payload.iss.replace(/https?:\/\//gi, "");
          return this.originalFrontendApi === i10;
        }
        sessionExpired(e10) {
          return !!e10 && e10?.payload.exp <= (Date.now() / 1e3 | 0);
        }
      }, re = async (e10, t10) => new t7(t10.publishableKey ? await tu(t10.publishableKey, tO.crypto.subtle) : "", e10, t10), rt = RegExp("(?<!:)/{1,}", "g");
      function rr(...e10) {
        return e10.filter((e11) => e11).join("/").replace(rt, "/");
      }
      var ri = class {
        constructor(e10) {
          this.request = e10;
        }
        requireId(e10) {
          if (!e10) throw Error("A valid resource ID is required.");
        }
      }, rn = "/actor_tokens", rs = class extends ri {
        async create(e10) {
          return this.request({ method: "POST", path: rn, bodyParams: e10 });
        }
        async revoke(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: rr(rn, e10, "revoke") });
        }
      }, ra = "/accountless_applications", ro = class extends ri {
        async createAccountlessApplication(e10) {
          let t10 = e10?.requestHeaders ? Object.fromEntries(e10.requestHeaders.entries()) : void 0;
          return this.request({ method: "POST", path: ra, headerParams: t10 });
        }
        async completeAccountlessApplicationOnboarding(e10) {
          let t10 = e10?.requestHeaders ? Object.fromEntries(e10.requestHeaders.entries()) : void 0;
          return this.request({ method: "POST", path: rr(ra, "complete"), headerParams: t10 });
        }
      }, rl = "/allowlist_identifiers", rc = class extends ri {
        async getAllowlistIdentifierList(e10 = {}) {
          return this.request({ method: "GET", path: rl, queryParams: { ...e10, paginated: true } });
        }
        async createAllowlistIdentifier(e10) {
          return this.request({ method: "POST", path: rl, bodyParams: e10 });
        }
        async deleteAllowlistIdentifier(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rr(rl, e10) });
        }
      }, ru = "/api_keys", rd = class extends ri {
        async create(e10) {
          return this.request({ method: "POST", path: ru, bodyParams: e10 });
        }
        async revoke(e10) {
          let { apiKeyId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "POST", path: rr(ru, t10, "revoke"), bodyParams: r10 });
        }
        async getSecret(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rr(ru, e10, "secret") });
        }
        async verifySecret(e10) {
          return this.request({ method: "POST", path: rr(ru, "verify"), bodyParams: { secret: e10 } });
        }
      }, rh = class extends ri {
        async changeDomain(e10) {
          return this.request({ method: "POST", path: rr("/beta_features", "change_domain"), bodyParams: e10 });
        }
      }, rp = "/blocklist_identifiers", rf = class extends ri {
        async getBlocklistIdentifierList(e10 = {}) {
          return this.request({ method: "GET", path: rp, queryParams: e10 });
        }
        async createBlocklistIdentifier(e10) {
          return this.request({ method: "POST", path: rp, bodyParams: e10 });
        }
        async deleteBlocklistIdentifier(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rr(rp, e10) });
        }
      }, rm = "/clients", rg = class extends ri {
        async getClientList(e10 = {}) {
          return this.request({ method: "GET", path: rm, queryParams: { ...e10, paginated: true } });
        }
        async getClient(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rr(rm, e10) });
        }
        verifyClient(e10) {
          return this.request({ method: "POST", path: rr(rm, "verify"), bodyParams: { token: e10 } });
        }
        async getHandshakePayload(e10) {
          return this.request({ method: "GET", path: rr(rm, "handshake_payload"), queryParams: e10 });
        }
      }, ry = "/domains", r_ = class extends ri {
        async list() {
          return this.request({ method: "GET", path: ry });
        }
        async add(e10) {
          return this.request({ method: "POST", path: ry, bodyParams: e10 });
        }
        async update(e10) {
          let { domainId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "PATCH", path: rr(ry, t10), bodyParams: r10 });
        }
        async delete(e10) {
          return this.deleteDomain(e10);
        }
        async deleteDomain(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rr(ry, e10) });
        }
      }, rb = "/email_addresses", rv = class extends ri {
        async getEmailAddress(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rr(rb, e10) });
        }
        async createEmailAddress(e10) {
          return this.request({ method: "POST", path: rb, bodyParams: e10 });
        }
        async updateEmailAddress(e10, t10 = {}) {
          return this.requireId(e10), this.request({ method: "PATCH", path: rr(rb, e10), bodyParams: t10 });
        }
        async deleteEmailAddress(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rr(rb, e10) });
        }
      }, rw = class extends ri {
        async verifyAccessToken(e10) {
          return this.request({ method: "POST", path: rr("/oauth_applications/access_tokens", "verify"), bodyParams: { access_token: e10 } });
        }
      }, rk = "/instance", rS = class extends ri {
        async get() {
          return this.request({ method: "GET", path: rk });
        }
        async update(e10) {
          return this.request({ method: "PATCH", path: rk, bodyParams: e10 });
        }
        async updateRestrictions(e10) {
          return this.request({ method: "PATCH", path: rr(rk, "restrictions"), bodyParams: e10 });
        }
        async updateOrganizationSettings(e10) {
          return this.request({ method: "PATCH", path: rr(rk, "organization_settings"), bodyParams: e10 });
        }
      }, rT = "/invitations", rE = class extends ri {
        async getInvitationList(e10 = {}) {
          return this.request({ method: "GET", path: rT, queryParams: { ...e10, paginated: true } });
        }
        async createInvitation(e10) {
          return this.request({ method: "POST", path: rT, bodyParams: e10 });
        }
        async revokeInvitation(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: rr(rT, e10, "revoke") });
        }
      }, rx = "/machines", rO = class extends ri {
        async get(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rr(rx, e10) });
        }
        async list(e10 = {}) {
          return this.request({ method: "GET", path: rx, queryParams: e10 });
        }
        async create(e10) {
          return this.request({ method: "POST", path: rx, bodyParams: e10 });
        }
        async update(e10) {
          let { machineId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "PATCH", path: rr(rx, t10), bodyParams: r10 });
        }
        async delete(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rr(rx, e10) });
        }
        async getSecretKey(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rr(rx, e10, "secret_key") });
        }
        async createScope(e10, t10) {
          return this.requireId(e10), this.request({ method: "POST", path: rr(rx, e10, "scopes"), bodyParams: { toMachineId: t10 } });
        }
        async deleteScope(e10, t10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rr(rx, e10, "scopes", t10) });
        }
      }, rC = "/m2m_tokens", rR = class extends ri {
        constructor() {
          super(...arguments), ((e10, t10, r10) => t10.has(e10) ? tj("Cannot add the same private member more than once") : t10 instanceof WeakSet ? t10.add(e10) : t10.set(e10, r10))(this, sF);
        }
        async createToken(e10) {
          let { claims: t10 = null, machineSecretKey: r10, secondsUntilExpiration: i10 = null } = e10 || {}, n10 = tH(this, sF, sW).call(this, { method: "POST", path: rC, bodyParams: { secondsUntilExpiration: i10, claims: t10 } }, r10);
          return this.request(n10);
        }
        async revokeToken(e10) {
          let { m2mTokenId: t10, revocationReason: r10 = null, machineSecretKey: i10 } = e10;
          this.requireId(t10);
          let n10 = tH(this, sF, sW).call(this, { method: "POST", path: rr(rC, t10, "revoke"), bodyParams: { revocationReason: r10 } }, i10);
          return this.request(n10);
        }
        async verifyToken(e10) {
          let { token: t10, machineSecretKey: r10 } = e10, i10 = tH(this, sF, sW).call(this, { method: "POST", path: rr(rC, "verify"), bodyParams: { token: t10 } }, r10);
          return this.request(i10);
        }
      };
      sF = /* @__PURE__ */ new WeakSet(), sW = function(e10, t10) {
        return t10 ? { ...e10, headerParams: { ...e10.headerParams, Authorization: `Bearer ${t10}` } } : e10;
      };
      var rI = class extends ri {
        async getJwks() {
          return this.request({ method: "GET", path: "/jwks" });
        }
      }, rP = "/jwt_templates", rA = class extends ri {
        async list(e10 = {}) {
          return this.request({ method: "GET", path: rP, queryParams: { ...e10, paginated: true } });
        }
        async get(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rr(rP, e10) });
        }
        async create(e10) {
          return this.request({ method: "POST", path: rP, bodyParams: e10 });
        }
        async update(e10) {
          let { templateId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "PATCH", path: rr(rP, t10), bodyParams: r10 });
        }
        async delete(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rr(rP, e10) });
        }
      }, rN = "/organizations", rU = class extends ri {
        async getOrganizationList(e10) {
          return this.request({ method: "GET", path: rN, queryParams: e10 });
        }
        async createOrganization(e10) {
          return this.request({ method: "POST", path: rN, bodyParams: e10 });
        }
        async getOrganization(e10) {
          let { includeMembersCount: t10 } = e10, r10 = "organizationId" in e10 ? e10.organizationId : e10.slug;
          return this.requireId(r10), this.request({ method: "GET", path: rr(rN, r10), queryParams: { includeMembersCount: t10 } });
        }
        async updateOrganization(e10, t10) {
          return this.requireId(e10), this.request({ method: "PATCH", path: rr(rN, e10), bodyParams: t10 });
        }
        async updateOrganizationLogo(e10, t10) {
          this.requireId(e10);
          let r10 = new tO.FormData();
          return r10.append("file", t10?.file), t10?.uploaderUserId && r10.append("uploader_user_id", t10?.uploaderUserId), this.request({ method: "PUT", path: rr(rN, e10, "logo"), formData: r10 });
        }
        async deleteOrganizationLogo(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rr(rN, e10, "logo") });
        }
        async updateOrganizationMetadata(e10, t10) {
          return this.requireId(e10), this.request({ method: "PATCH", path: rr(rN, e10, "metadata"), bodyParams: t10 });
        }
        async deleteOrganization(e10) {
          return this.request({ method: "DELETE", path: rr(rN, e10) });
        }
        async getOrganizationMembershipList(e10) {
          let { organizationId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "GET", path: rr(rN, t10, "memberships"), queryParams: r10 });
        }
        async getInstanceOrganizationMembershipList(e10) {
          return this.request({ method: "GET", path: "/organization_memberships", queryParams: e10 });
        }
        async createOrganizationMembership(e10) {
          let { organizationId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "POST", path: rr(rN, t10, "memberships"), bodyParams: r10 });
        }
        async updateOrganizationMembership(e10) {
          let { organizationId: t10, userId: r10, ...i10 } = e10;
          return this.requireId(t10), this.request({ method: "PATCH", path: rr(rN, t10, "memberships", r10), bodyParams: i10 });
        }
        async updateOrganizationMembershipMetadata(e10) {
          let { organizationId: t10, userId: r10, ...i10 } = e10;
          return this.request({ method: "PATCH", path: rr(rN, t10, "memberships", r10, "metadata"), bodyParams: i10 });
        }
        async deleteOrganizationMembership(e10) {
          let { organizationId: t10, userId: r10 } = e10;
          return this.requireId(t10), this.request({ method: "DELETE", path: rr(rN, t10, "memberships", r10) });
        }
        async getOrganizationInvitationList(e10) {
          let { organizationId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "GET", path: rr(rN, t10, "invitations"), queryParams: r10 });
        }
        async createOrganizationInvitation(e10) {
          let { organizationId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "POST", path: rr(rN, t10, "invitations"), bodyParams: r10 });
        }
        async createOrganizationInvitationBulk(e10, t10) {
          return this.requireId(e10), this.request({ method: "POST", path: rr(rN, e10, "invitations", "bulk"), bodyParams: t10 });
        }
        async getOrganizationInvitation(e10) {
          let { organizationId: t10, invitationId: r10 } = e10;
          return this.requireId(t10), this.requireId(r10), this.request({ method: "GET", path: rr(rN, t10, "invitations", r10) });
        }
        async revokeOrganizationInvitation(e10) {
          let { organizationId: t10, invitationId: r10, ...i10 } = e10;
          return this.requireId(t10), this.request({ method: "POST", path: rr(rN, t10, "invitations", r10, "revoke"), bodyParams: i10 });
        }
        async getOrganizationDomainList(e10) {
          let { organizationId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "GET", path: rr(rN, t10, "domains"), queryParams: r10 });
        }
        async createOrganizationDomain(e10) {
          let { organizationId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "POST", path: rr(rN, t10, "domains"), bodyParams: { ...r10, verified: r10.verified ?? true } });
        }
        async updateOrganizationDomain(e10) {
          let { organizationId: t10, domainId: r10, ...i10 } = e10;
          return this.requireId(t10), this.requireId(r10), this.request({ method: "PATCH", path: rr(rN, t10, "domains", r10), bodyParams: i10 });
        }
        async deleteOrganizationDomain(e10) {
          let { organizationId: t10, domainId: r10 } = e10;
          return this.requireId(t10), this.requireId(r10), this.request({ method: "DELETE", path: rr(rN, t10, "domains", r10) });
        }
      }, rM = "/oauth_applications", rL = class extends ri {
        async list(e10 = {}) {
          return this.request({ method: "GET", path: rM, queryParams: e10 });
        }
        async get(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rr(rM, e10) });
        }
        async create(e10) {
          return this.request({ method: "POST", path: rM, bodyParams: e10 });
        }
        async update(e10) {
          let { oauthApplicationId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "PATCH", path: rr(rM, t10), bodyParams: r10 });
        }
        async delete(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rr(rM, e10) });
        }
        async rotateSecret(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: rr(rM, e10, "rotate_secret") });
        }
      }, rD = "/phone_numbers", rq = class extends ri {
        async getPhoneNumber(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rr(rD, e10) });
        }
        async createPhoneNumber(e10) {
          return this.request({ method: "POST", path: rD, bodyParams: e10 });
        }
        async updatePhoneNumber(e10, t10 = {}) {
          return this.requireId(e10), this.request({ method: "PATCH", path: rr(rD, e10), bodyParams: t10 });
        }
        async deletePhoneNumber(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rr(rD, e10) });
        }
      }, rj = class extends ri {
        async verify(e10) {
          return this.request({ method: "POST", path: "/proxy_checks", bodyParams: e10 });
        }
      }, rH = "/redirect_urls", rB = class extends ri {
        async getRedirectUrlList() {
          return this.request({ method: "GET", path: rH, queryParams: { paginated: true } });
        }
        async getRedirectUrl(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rr(rH, e10) });
        }
        async createRedirectUrl(e10) {
          return this.request({ method: "POST", path: rH, bodyParams: e10 });
        }
        async deleteRedirectUrl(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rr(rH, e10) });
        }
      }, rz = "/saml_connections", rK = class extends ri {
        async getSamlConnectionList(e10 = {}) {
          return this.request({ method: "GET", path: rz, queryParams: e10 });
        }
        async createSamlConnection(e10) {
          return this.request({ method: "POST", path: rz, bodyParams: e10, options: { deepSnakecaseBodyParamKeys: true } });
        }
        async getSamlConnection(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rr(rz, e10) });
        }
        async updateSamlConnection(e10, t10 = {}) {
          return this.requireId(e10), this.request({ method: "PATCH", path: rr(rz, e10), bodyParams: t10, options: { deepSnakecaseBodyParamKeys: true } });
        }
        async deleteSamlConnection(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rr(rz, e10) });
        }
      }, rJ = "/sessions", r$ = class extends ri {
        async getSessionList(e10 = {}) {
          return this.request({ method: "GET", path: rJ, queryParams: { ...e10, paginated: true } });
        }
        async getSession(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rr(rJ, e10) });
        }
        async createSession(e10) {
          return this.request({ method: "POST", path: rJ, bodyParams: e10 });
        }
        async revokeSession(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: rr(rJ, e10, "revoke") });
        }
        async verifySession(e10, t10) {
          return this.requireId(e10), this.request({ method: "POST", path: rr(rJ, e10, "verify"), bodyParams: { token: t10 } });
        }
        async getToken(e10, t10, r10) {
          this.requireId(e10);
          let i10 = { method: "POST", path: t10 ? rr(rJ, e10, "tokens", t10) : rr(rJ, e10, "tokens") };
          return void 0 !== r10 && (i10.bodyParams = { expires_in_seconds: r10 }), this.request(i10);
        }
        async refreshSession(e10, t10) {
          this.requireId(e10);
          let { suffixed_cookies: r10, ...i10 } = t10;
          return this.request({ method: "POST", path: rr(rJ, e10, "refresh"), bodyParams: i10, queryParams: { suffixed_cookies: r10 } });
        }
      }, rF = "/sign_in_tokens", rW = class extends ri {
        async createSignInToken(e10) {
          return this.request({ method: "POST", path: rF, bodyParams: e10 });
        }
        async revokeSignInToken(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: rr(rF, e10, "revoke") });
        }
      }, rV = "/sign_ups", rG = class extends ri {
        async get(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rr(rV, e10) });
        }
        async update(e10) {
          let { signUpAttemptId: t10, ...r10 } = e10;
          return this.request({ method: "PATCH", path: rr(rV, t10), bodyParams: r10 });
        }
      }, rX = class extends ri {
        async createTestingToken() {
          return this.request({ method: "POST", path: "/testing_tokens" });
        }
      }, rQ = "/users", rY = class extends ri {
        async getUserList(e10 = {}) {
          let { limit: t10, offset: r10, orderBy: i10, ...n10 } = e10, [s10, a10] = await Promise.all([this.request({ method: "GET", path: rQ, queryParams: e10 }), this.getCount(n10)]);
          return { data: s10, totalCount: a10 };
        }
        async getUser(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rr(rQ, e10) });
        }
        async createUser(e10) {
          return this.request({ method: "POST", path: rQ, bodyParams: e10 });
        }
        async updateUser(e10, t10 = {}) {
          return this.requireId(e10), this.request({ method: "PATCH", path: rr(rQ, e10), bodyParams: t10 });
        }
        async updateUserProfileImage(e10, t10) {
          this.requireId(e10);
          let r10 = new tO.FormData();
          return r10.append("file", t10?.file), this.request({ method: "POST", path: rr(rQ, e10, "profile_image"), formData: r10 });
        }
        async updateUserMetadata(e10, t10) {
          return this.requireId(e10), this.request({ method: "PATCH", path: rr(rQ, e10, "metadata"), bodyParams: t10 });
        }
        async deleteUser(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rr(rQ, e10) });
        }
        async getCount(e10 = {}) {
          return this.request({ method: "GET", path: rr(rQ, "count"), queryParams: e10 });
        }
        async getUserOauthAccessToken(e10, t10) {
          this.requireId(e10);
          let r10 = t10.startsWith("oauth_"), i10 = r10 ? t10 : `oauth_${t10}`;
          return r10 && ((e11, t11, r11) => {
            let i11 = td(), n10 = r11 ?? e11;
            th.has(n10) || i11 || (th.add(n10), console.warn(`Clerk - DEPRECATION WARNING: "${e11}" is deprecated and will be removed in the next major release.
${t11}`));
          })("getUserOauthAccessToken(userId, provider)", "Remove the `oauth_` prefix from the `provider` argument."), this.request({ method: "GET", path: rr(rQ, e10, "oauth_access_tokens", i10), queryParams: { paginated: true } });
        }
        async disableUserMFA(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rr(rQ, e10, "mfa") });
        }
        async getOrganizationMembershipList(e10) {
          let { userId: t10, limit: r10, offset: i10 } = e10;
          return this.requireId(t10), this.request({ method: "GET", path: rr(rQ, t10, "organization_memberships"), queryParams: { limit: r10, offset: i10 } });
        }
        async getOrganizationInvitationList(e10) {
          let { userId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "GET", path: rr(rQ, t10, "organization_invitations"), queryParams: r10 });
        }
        async verifyPassword(e10) {
          let { userId: t10, password: r10 } = e10;
          return this.requireId(t10), this.request({ method: "POST", path: rr(rQ, t10, "verify_password"), bodyParams: { password: r10 } });
        }
        async verifyTOTP(e10) {
          let { userId: t10, code: r10 } = e10;
          return this.requireId(t10), this.request({ method: "POST", path: rr(rQ, t10, "verify_totp"), bodyParams: { code: r10 } });
        }
        async banUser(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: rr(rQ, e10, "ban") });
        }
        async unbanUser(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: rr(rQ, e10, "unban") });
        }
        async lockUser(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: rr(rQ, e10, "lock") });
        }
        async unlockUser(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: rr(rQ, e10, "unlock") });
        }
        async deleteUserProfileImage(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rr(rQ, e10, "profile_image") });
        }
        async deleteUserPasskey(e10) {
          return this.requireId(e10.userId), this.requireId(e10.passkeyIdentificationId), this.request({ method: "DELETE", path: rr(rQ, e10.userId, "passkeys", e10.passkeyIdentificationId) });
        }
        async deleteUserWeb3Wallet(e10) {
          return this.requireId(e10.userId), this.requireId(e10.web3WalletIdentificationId), this.request({ method: "DELETE", path: rr(rQ, e10.userId, "web3_wallets", e10.web3WalletIdentificationId) });
        }
        async deleteUserExternalAccount(e10) {
          return this.requireId(e10.userId), this.requireId(e10.externalAccountId), this.request({ method: "DELETE", path: rr(rQ, e10.userId, "external_accounts", e10.externalAccountId) });
        }
        async deleteUserBackupCodes(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rr(rQ, e10, "backup_code") });
        }
        async deleteUserTOTP(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rr(rQ, e10, "totp") });
        }
      }, rZ = "/waitlist_entries", r0 = class extends ri {
        async list(e10 = {}) {
          return this.request({ method: "GET", path: rZ, queryParams: e10 });
        }
        async create(e10) {
          return this.request({ method: "POST", path: rZ, bodyParams: e10 });
        }
      }, r1 = "/webhooks", r2 = class extends ri {
        async createSvixApp() {
          return this.request({ method: "POST", path: rr(r1, "svix") });
        }
        async generateSvixAuthURL() {
          return this.request({ method: "POST", path: rr(r1, "svix_url") });
        }
        async deleteSvixApp() {
          return this.request({ method: "DELETE", path: rr(r1, "svix") });
        }
      }, r4 = "/commerce", r5 = class extends ri {
        async getPlanList(e10) {
          return this.request({ method: "GET", path: rr(r4, "plans"), queryParams: e10 });
        }
        async cancelSubscriptionItem(e10, t10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rr(r4, "subscription_items", e10), queryParams: t10 });
        }
        async getOrganizationBillingSubscription(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rr("/organizations", e10, "billing", "subscription") });
        }
        async getUserBillingSubscription(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rr("/users", e10, "billing", "subscription") });
        }
      }, r3 = (e10) => "object" == typeof e10 && null !== e10, r6 = (e10) => r3(e10) && !(e10 instanceof RegExp) && !(e10 instanceof Error) && !(e10 instanceof Date) && !(globalThis.Blob && e10 instanceof globalThis.Blob), r9 = Symbol("mapObjectSkip"), r8 = (e10, t10, r10, i10 = /* @__PURE__ */ new WeakMap()) => {
        if (r10 = { deep: false, target: {}, ...r10 }, i10.has(e10)) return i10.get(e10);
        i10.set(e10, r10.target);
        let { target: n10 } = r10;
        delete r10.target;
        let s10 = (e11) => e11.map((e12) => r6(e12) ? r8(e12, t10, r10, i10) : e12);
        if (Array.isArray(e10)) return s10(e10);
        for (let [a10, o2] of Object.entries(e10)) {
          let l2 = t10(a10, o2, e10);
          if (l2 === r9) continue;
          let [c2, u2, { shouldRecurse: d2 = true } = {}] = l2;
          "__proto__" !== c2 && (r10.deep && d2 && r6(u2) && (u2 = Array.isArray(u2) ? s10(u2) : r8(u2, t10, r10, i10)), n10[c2] = u2);
        }
        return n10;
      };
      function r7(e10, t10, r10) {
        if (!r3(e10)) throw TypeError(`Expected an object, got \`${e10}\` (${typeof e10})`);
        if (Array.isArray(e10)) throw TypeError("Expected an object, got an array");
        return r8(e10, t10, r10);
      }
      var ie = /([\p{Ll}\d])(\p{Lu})/gu, it = /(\p{Lu})([\p{Lu}][\p{Ll}])/gu, ir = /(\d)\p{Ll}|(\p{L})\d/u, ii = /[^\p{L}\d]+/giu, is = "$1\0$2";
      function ia(e10) {
        let t10 = e10.trim();
        t10 = (t10 = t10.replace(ie, is).replace(it, is)).replace(ii, "\0");
        let r10 = 0, i10 = t10.length;
        for (; "\0" === t10.charAt(r10); ) r10++;
        if (r10 === i10) return [];
        for (; "\0" === t10.charAt(i10 - 1); ) i10--;
        return t10.slice(r10, i10).split(/\0/g);
      }
      function io(e10) {
        let t10 = ia(e10);
        for (let e11 = 0; e11 < t10.length; e11++) {
          let r10 = t10[e11], i10 = ir.exec(r10);
          if (i10) {
            let n10 = i10.index + (i10[1] ?? i10[2]).length;
            t10.splice(e11, 1, r10.slice(0, n10), r10.slice(n10));
          }
        }
        return t10;
      }
      function il(e10, t10) {
        var r10, i10 = { delimiter: "_", ...t10 };
        let [n10, s10, a10] = function(e11, t11 = {}) {
          let r11 = t11.split ?? (t11.separateNumbers ? io : ia), i11 = t11.prefixCharacters ?? "", n11 = t11.suffixCharacters ?? "", s11 = 0, a11 = e11.length;
          for (; s11 < e11.length; ) {
            let t12 = e11.charAt(s11);
            if (!i11.includes(t12)) break;
            s11++;
          }
          for (; a11 > s11; ) {
            let t12 = a11 - 1, r12 = e11.charAt(t12);
            if (!n11.includes(r12)) break;
            a11 = t12;
          }
          return [e11.slice(0, s11), r11(e11.slice(s11, a11)), e11.slice(a11)];
        }(e10, i10);
        return n10 + s10.map(false === (r10 = i10?.locale) ? (e11) => e11.toLowerCase() : (e11) => e11.toLocaleLowerCase(r10)).join(i10?.delimiter ?? " ") + a10;
      }
      var ic = {}.constructor;
      function iu(e10, t10) {
        return e10.some((e11) => "string" == typeof e11 ? e11 === t10 : e11.test(t10));
      }
      function id(e10, t10, r10) {
        return r10.shouldRecurse ? { shouldRecurse: r10.shouldRecurse(e10, t10) } : void 0;
      }
      var ih = function(e10, t10) {
        if (Array.isArray(e10)) {
          if (e10.some((e11) => e11.constructor !== ic)) throw Error("obj must be array of plain objects");
          let r11 = (t10 = { deep: true, exclude: [], parsingOptions: {}, ...t10 }).snakeCase || ((e11) => il(e11, t10.parsingOptions));
          return e10.map((e11) => r7(e11, (e12, i10) => [iu(t10.exclude, e12) ? e12 : r11(e12), i10, id(e12, i10, t10)], t10));
        }
        if (e10.constructor !== ic) throw Error("obj must be an plain object");
        let r10 = (t10 = { deep: true, exclude: [], parsingOptions: {}, ...t10 }).snakeCase || ((e11) => il(e11, t10.parsingOptions));
        return r7(e10, (e11, i10) => [iu(t10.exclude, e11) ? e11 : r10(e11), i10, id(e11, i10, t10)], t10);
      }, ip = class e10 {
        constructor(e11, t10, r10, i10) {
          this.publishableKey = e11, this.secretKey = t10, this.claimUrl = r10, this.apiKeysUrl = i10;
        }
        static fromJSON(t10) {
          return new e10(t10.publishable_key, t10.secret_key, t10.claim_url, t10.api_keys_url);
        }
      }, im = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o2) {
          this.id = e11, this.status = t10, this.userId = r10, this.actor = i10, this.token = n10, this.url = s10, this.createdAt = a10, this.updatedAt = o2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.status, t10.user_id, t10.actor, t10.token, t10.url, t10.created_at, t10.updated_at);
        }
      }, ig = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10) {
          this.id = e11, this.identifier = t10, this.identifierType = r10, this.createdAt = i10, this.updatedAt = n10, this.instanceId = s10, this.invitationId = a10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.identifier, t10.identifier_type, t10.created_at, t10.updated_at, t10.instance_id, t10.invitation_id);
        }
      }, iy = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o2, l2, c2, u2, d2, h2, p2, f2, m2) {
          this.id = e11, this.type = t10, this.name = r10, this.subject = i10, this.scopes = n10, this.claims = s10, this.revoked = a10, this.revocationReason = o2, this.expired = l2, this.expiration = c2, this.createdBy = u2, this.description = d2, this.lastUsedAt = h2, this.createdAt = p2, this.updatedAt = f2, this.secret = m2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.type, t10.name, t10.subject, t10.scopes, t10.claims, t10.revoked, t10.revocation_reason, t10.expired, t10.expiration, t10.created_by, t10.description, t10.last_used_at, t10.created_at, t10.updated_at, t10.secret);
        }
      }, i_ = class e10 {
        constructor(e11, t10, r10, i10, n10, s10) {
          this.id = e11, this.identifier = t10, this.identifierType = r10, this.createdAt = i10, this.updatedAt = n10, this.instanceId = s10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.identifier, t10.identifier_type, t10.created_at, t10.updated_at, t10.instance_id);
        }
      }, ib = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o2) {
          this.id = e11, this.isMobile = t10, this.ipAddress = r10, this.city = i10, this.country = n10, this.browserVersion = s10, this.browserName = a10, this.deviceType = o2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.is_mobile, t10.ip_address, t10.city, t10.country, t10.browser_version, t10.browser_name, t10.device_type);
        }
      }, iv = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o2, l2, c2, u2, d2 = null) {
          this.id = e11, this.clientId = t10, this.userId = r10, this.status = i10, this.lastActiveAt = n10, this.expireAt = s10, this.abandonAt = a10, this.createdAt = o2, this.updatedAt = l2, this.lastActiveOrganizationId = c2, this.latestActivity = u2, this.actor = d2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.client_id, t10.user_id, t10.status, t10.last_active_at, t10.expire_at, t10.abandon_at, t10.created_at, t10.updated_at, t10.last_active_organization_id, t10.latest_activity && ib.fromJSON(t10.latest_activity), t10.actor);
        }
      }, iw = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o2) {
          this.id = e11, this.sessionIds = t10, this.sessions = r10, this.signInId = i10, this.signUpId = n10, this.lastActiveSessionId = s10, this.createdAt = a10, this.updatedAt = o2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.session_ids, t10.sessions.map((e11) => iv.fromJSON(e11)), t10.sign_in_id, t10.sign_up_id, t10.last_active_session_id, t10.created_at, t10.updated_at);
        }
      }, ik = class e10 {
        constructor(e11, t10, r10) {
          this.host = e11, this.value = t10, this.required = r10;
        }
        static fromJSON(t10) {
          return new e10(t10.host, t10.value, t10.required);
        }
      }, iS = class e10 {
        constructor(e11) {
          this.cookies = e11;
        }
        static fromJSON(t10) {
          return new e10(t10.cookies);
        }
      }, iT = class e10 {
        constructor(e11, t10, r10, i10) {
          this.object = e11, this.id = t10, this.slug = r10, this.deleted = i10;
        }
        static fromJSON(t10) {
          return new e10(t10.object, t10.id || null, t10.slug || null, t10.deleted);
        }
      }, iE = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o2) {
          this.id = e11, this.name = t10, this.isSatellite = r10, this.frontendApiUrl = i10, this.developmentOrigin = n10, this.cnameTargets = s10, this.accountsPortalUrl = a10, this.proxyUrl = o2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.name, t10.is_satellite, t10.frontend_api_url, t10.development_origin, t10.cname_targets && t10.cname_targets.map((e11) => ik.fromJSON(e11)), t10.accounts_portal_url, t10.proxy_url);
        }
      }, ix = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o2, l2, c2, u2) {
          this.id = e11, this.fromEmailName = t10, this.emailAddressId = r10, this.toEmailAddress = i10, this.subject = n10, this.body = s10, this.bodyPlain = a10, this.status = o2, this.slug = l2, this.data = c2, this.deliveredByClerk = u2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.from_email_name, t10.email_address_id, t10.to_email_address, t10.subject, t10.body, t10.body_plain, t10.status, t10.slug, t10.data, t10.delivered_by_clerk);
        }
      }, iO = class e10 {
        constructor(e11, t10) {
          this.id = e11, this.type = t10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.type);
        }
      }, iC = class e10 {
        constructor(e11, t10, r10 = null, i10 = null, n10 = null, s10 = null, a10 = null) {
          this.status = e11, this.strategy = t10, this.externalVerificationRedirectURL = r10, this.attempts = i10, this.expireAt = n10, this.nonce = s10, this.message = a10;
        }
        static fromJSON(t10) {
          return new e10(t10.status, t10.strategy, t10.external_verification_redirect_url ? new URL(t10.external_verification_redirect_url) : null, t10.attempts, t10.expire_at, t10.nonce);
        }
      }, iR = class e10 {
        constructor(e11, t10, r10, i10) {
          this.id = e11, this.emailAddress = t10, this.verification = r10, this.linkedTo = i10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.email_address, t10.verification && iC.fromJSON(t10.verification), t10.linked_to.map((e11) => iO.fromJSON(e11)));
        }
      }, iI = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o2, l2, c2, u2, d2 = {}, h2, p2) {
          this.id = e11, this.provider = t10, this.identificationId = r10, this.externalId = i10, this.approvedScopes = n10, this.emailAddress = s10, this.firstName = a10, this.lastName = o2, this.imageUrl = l2, this.username = c2, this.phoneNumber = u2, this.publicMetadata = d2, this.label = h2, this.verification = p2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.provider, t10.identification_id, t10.provider_user_id, t10.approved_scopes, t10.email_address, t10.first_name, t10.last_name, t10.image_url || "", t10.username, t10.phone_number, t10.public_metadata, t10.label, t10.verification && iC.fromJSON(t10.verification));
        }
      }, iP = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o2, l2, c2, u2) {
          this.id = e11, this.clientId = t10, this.type = r10, this.subject = i10, this.scopes = n10, this.revoked = s10, this.revocationReason = a10, this.expired = o2, this.expiration = l2, this.createdAt = c2, this.updatedAt = u2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.client_id, t10.type, t10.subject, t10.scopes, t10.revoked, t10.revocation_reason, t10.expired, t10.expiration, t10.created_at, t10.updated_at);
        }
      }, iA = class e10 {
        constructor(e11, t10, r10) {
          this.id = e11, this.environmentType = t10, this.allowedOrigins = r10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.environment_type, t10.allowed_origins);
        }
      }, iN = class e10 {
        constructor(e11, t10, r10, i10, n10) {
          this.allowlist = e11, this.blocklist = t10, this.blockEmailSubaddresses = r10, this.blockDisposableEmailDomains = i10, this.ignoreDotsForGmailAddresses = n10;
        }
        static fromJSON(t10) {
          return new e10(t10.allowlist, t10.blocklist, t10.block_email_subaddresses, t10.block_disposable_email_domains, t10.ignore_dots_for_gmail_addresses);
        }
      }, iU = class e10 {
        constructor(e11, t10, r10, i10, n10) {
          this.id = e11, this.restrictedToAllowlist = t10, this.fromEmailAddress = r10, this.progressiveSignUp = i10, this.enhancedEmailDeliverability = n10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.restricted_to_allowlist, t10.from_email_address, t10.progressive_sign_up, t10.enhanced_email_deliverability);
        }
      }, iM = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o2) {
          this.id = e11, this.emailAddress = t10, this.publicMetadata = r10, this.createdAt = i10, this.updatedAt = n10, this.status = s10, this.url = a10, this.revoked = o2, this._raw = null;
        }
        get raw() {
          return this._raw;
        }
        static fromJSON(t10) {
          let r10 = new e10(t10.id, t10.email_address, t10.public_metadata, t10.created_at, t10.updated_at, t10.status, t10.url, t10.revoked);
          return r10._raw = t10, r10;
        }
      }, iL = { AccountlessApplication: "accountless_application", ActorToken: "actor_token", AllowlistIdentifier: "allowlist_identifier", ApiKey: "api_key", BlocklistIdentifier: "blocklist_identifier", Client: "client", Cookies: "cookies", Domain: "domain", Email: "email", EmailAddress: "email_address", Instance: "instance", InstanceRestrictions: "instance_restrictions", InstanceSettings: "instance_settings", Invitation: "invitation", Machine: "machine", MachineScope: "machine_scope", MachineSecretKey: "machine_secret_key", M2MToken: "machine_to_machine_token", JwtTemplate: "jwt_template", OauthAccessToken: "oauth_access_token", IdpOAuthAccessToken: "clerk_idp_oauth_access_token", OAuthApplication: "oauth_application", Organization: "organization", OrganizationInvitation: "organization_invitation", OrganizationMembership: "organization_membership", OrganizationSettings: "organization_settings", PhoneNumber: "phone_number", ProxyCheck: "proxy_check", RedirectUrl: "redirect_url", SamlConnection: "saml_connection", Session: "session", SignInToken: "sign_in_token", SignUpAttempt: "sign_up_attempt", SmsMessage: "sms_message", User: "user", WaitlistEntry: "waitlist_entry", Token: "token", TotalCount: "total_count", CommerceSubscription: "commerce_subscription", CommerceSubscriptionItem: "commerce_subscription_item", CommercePlan: "commerce_plan", Feature: "feature" }, iD = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o2) {
          this.id = e11, this.name = t10, this.instanceId = r10, this.createdAt = i10, this.updatedAt = n10, this.scopedMachines = s10, this.defaultTokenTtl = a10, this.secretKey = o2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.name, t10.instance_id, t10.created_at, t10.updated_at, t10.scoped_machines.map((t11) => new e10(t11.id, t11.name, t11.instance_id, t11.created_at, t11.updated_at, [], t11.default_token_ttl)), t10.default_token_ttl, t10.secret_key);
        }
      }, iq = class e10 {
        constructor(e11, t10, r10, i10) {
          this.fromMachineId = e11, this.toMachineId = t10, this.createdAt = r10, this.deleted = i10;
        }
        static fromJSON(t10) {
          return new e10(t10.from_machine_id, t10.to_machine_id, t10.created_at, t10.deleted);
        }
      }, ij = class e10 {
        constructor(e11) {
          this.secret = e11;
        }
        static fromJSON(t10) {
          return new e10(t10.secret);
        }
      }, iH = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o2, l2, c2, u2) {
          this.id = e11, this.subject = t10, this.scopes = r10, this.claims = i10, this.revoked = n10, this.revocationReason = s10, this.expired = a10, this.expiration = o2, this.createdAt = l2, this.updatedAt = c2, this.token = u2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.subject, t10.scopes, t10.claims, t10.revoked, t10.revocation_reason, t10.expired, t10.expiration, t10.created_at, t10.updated_at, t10.token);
        }
      }, iB = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o2, l2) {
          this.id = e11, this.name = t10, this.claims = r10, this.lifetime = i10, this.allowedClockSkew = n10, this.customSigningKey = s10, this.signingAlgorithm = a10, this.createdAt = o2, this.updatedAt = l2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.name, t10.claims, t10.lifetime, t10.allowed_clock_skew, t10.custom_signing_key, t10.signing_algorithm, t10.created_at, t10.updated_at);
        }
      }, iz = class e10 {
        constructor(e11, t10, r10, i10 = {}, n10, s10, a10, o2) {
          this.externalAccountId = e11, this.provider = t10, this.token = r10, this.publicMetadata = i10, this.label = n10, this.scopes = s10, this.tokenSecret = a10, this.expiresAt = o2;
        }
        static fromJSON(t10) {
          return new e10(t10.external_account_id, t10.provider, t10.token, t10.public_metadata, t10.label || "", t10.scopes, t10.token_secret, t10.expires_at);
        }
      }, iK = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o2, l2, c2, u2, d2, h2, p2, f2, m2, g2, y2, _2, b2) {
          this.id = e11, this.instanceId = t10, this.name = r10, this.clientId = i10, this.clientUri = n10, this.clientImageUrl = s10, this.dynamicallyRegistered = a10, this.consentScreenEnabled = o2, this.pkceRequired = l2, this.isPublic = c2, this.scopes = u2, this.redirectUris = d2, this.authorizeUrl = h2, this.tokenFetchUrl = p2, this.userInfoUrl = f2, this.discoveryUrl = m2, this.tokenIntrospectionUrl = g2, this.createdAt = y2, this.updatedAt = _2, this.clientSecret = b2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.instance_id, t10.name, t10.client_id, t10.client_uri, t10.client_image_url, t10.dynamically_registered, t10.consent_screen_enabled, t10.pkce_required, t10.public, t10.scopes, t10.redirect_uris, t10.authorize_url, t10.token_fetch_url, t10.user_info_url, t10.discovery_url, t10.token_introspection_url, t10.created_at, t10.updated_at, t10.client_secret);
        }
      }, iJ = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o2 = {}, l2 = {}, c2, u2, d2, h2) {
          this.id = e11, this.name = t10, this.slug = r10, this.imageUrl = i10, this.hasImage = n10, this.createdAt = s10, this.updatedAt = a10, this.publicMetadata = o2, this.privateMetadata = l2, this.maxAllowedMemberships = c2, this.adminDeleteEnabled = u2, this.membersCount = d2, this.createdBy = h2, this._raw = null;
        }
        get raw() {
          return this._raw;
        }
        static fromJSON(t10) {
          let r10 = new e10(t10.id, t10.name, t10.slug, t10.image_url || "", t10.has_image, t10.created_at, t10.updated_at, t10.public_metadata, t10.private_metadata, t10.max_allowed_memberships, t10.admin_delete_enabled, t10.members_count, t10.created_by);
          return r10._raw = t10, r10;
        }
      }, i$ = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o2, l2, c2, u2 = {}, d2 = {}, h2) {
          this.id = e11, this.emailAddress = t10, this.role = r10, this.roleName = i10, this.organizationId = n10, this.createdAt = s10, this.updatedAt = a10, this.expiresAt = o2, this.url = l2, this.status = c2, this.publicMetadata = u2, this.privateMetadata = d2, this.publicOrganizationData = h2, this._raw = null;
        }
        get raw() {
          return this._raw;
        }
        static fromJSON(t10) {
          let r10 = new e10(t10.id, t10.email_address, t10.role, t10.role_name, t10.organization_id, t10.created_at, t10.updated_at, t10.expires_at, t10.url, t10.status, t10.public_metadata, t10.private_metadata, t10.public_organization_data);
          return r10._raw = t10, r10;
        }
      }, iF = class e10 {
        constructor(e11, t10, r10, i10 = {}, n10 = {}, s10, a10, o2, l2) {
          this.id = e11, this.role = t10, this.permissions = r10, this.publicMetadata = i10, this.privateMetadata = n10, this.createdAt = s10, this.updatedAt = a10, this.organization = o2, this.publicUserData = l2, this._raw = null;
        }
        get raw() {
          return this._raw;
        }
        static fromJSON(t10) {
          let r10 = new e10(t10.id, t10.role, t10.permissions, t10.public_metadata, t10.private_metadata, t10.created_at, t10.updated_at, iJ.fromJSON(t10.organization), iW.fromJSON(t10.public_user_data));
          return r10._raw = t10, r10;
        }
      }, iW = class e10 {
        constructor(e11, t10, r10, i10, n10, s10) {
          this.identifier = e11, this.firstName = t10, this.lastName = r10, this.imageUrl = i10, this.hasImage = n10, this.userId = s10;
        }
        static fromJSON(t10) {
          return new e10(t10.identifier, t10.first_name, t10.last_name, t10.image_url, t10.has_image, t10.user_id);
        }
      }, iV = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o2, l2) {
          this.enabled = e11, this.maxAllowedMemberships = t10, this.maxAllowedRoles = r10, this.maxAllowedPermissions = i10, this.creatorRole = n10, this.adminDeleteEnabled = s10, this.domainsEnabled = a10, this.domainsEnrollmentModes = o2, this.domainsDefaultRole = l2;
        }
        static fromJSON(t10) {
          return new e10(t10.enabled, t10.max_allowed_memberships, t10.max_allowed_roles, t10.max_allowed_permissions, t10.creator_role, t10.admin_delete_enabled, t10.domains_enabled, t10.domains_enrollment_modes, t10.domains_default_role);
        }
      }, iG = class e10 {
        constructor(e11, t10, r10, i10, n10, s10) {
          this.id = e11, this.phoneNumber = t10, this.reservedForSecondFactor = r10, this.defaultSecondFactor = i10, this.verification = n10, this.linkedTo = s10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.phone_number, t10.reserved_for_second_factor, t10.default_second_factor, t10.verification && iC.fromJSON(t10.verification), t10.linked_to.map((e11) => iO.fromJSON(e11)));
        }
      }, iX = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10) {
          this.id = e11, this.domainId = t10, this.lastRunAt = r10, this.proxyUrl = i10, this.successful = n10, this.createdAt = s10, this.updatedAt = a10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.domain_id, t10.last_run_at, t10.proxy_url, t10.successful, t10.created_at, t10.updated_at);
        }
      }, iQ = class e10 {
        constructor(e11, t10, r10, i10) {
          this.id = e11, this.url = t10, this.createdAt = r10, this.updatedAt = i10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.url, t10.created_at, t10.updated_at);
        }
      }, iY = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o2, l2, c2, u2, d2, h2, p2, f2, m2, g2, y2, _2, b2, v2) {
          this.id = e11, this.name = t10, this.domain = r10, this.organizationId = i10, this.idpEntityId = n10, this.idpSsoUrl = s10, this.idpCertificate = a10, this.idpMetadataUrl = o2, this.idpMetadata = l2, this.acsUrl = c2, this.spEntityId = u2, this.spMetadataUrl = d2, this.active = h2, this.provider = p2, this.userCount = f2, this.syncUserAttributes = m2, this.allowSubdomains = g2, this.allowIdpInitiated = y2, this.createdAt = _2, this.updatedAt = b2, this.attributeMapping = v2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.name, t10.domain, t10.organization_id, t10.idp_entity_id, t10.idp_sso_url, t10.idp_certificate, t10.idp_metadata_url, t10.idp_metadata, t10.acs_url, t10.sp_entity_id, t10.sp_metadata_url, t10.active, t10.provider, t10.user_count, t10.sync_user_attributes, t10.allow_subdomains, t10.allow_idp_initiated, t10.created_at, t10.updated_at, t10.attribute_mapping && i0.fromJSON(t10.attribute_mapping));
        }
      }, iZ = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o2, l2, c2) {
          this.id = e11, this.name = t10, this.domain = r10, this.active = i10, this.provider = n10, this.syncUserAttributes = s10, this.allowSubdomains = a10, this.allowIdpInitiated = o2, this.createdAt = l2, this.updatedAt = c2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.name, t10.domain, t10.active, t10.provider, t10.sync_user_attributes, t10.allow_subdomains, t10.allow_idp_initiated, t10.created_at, t10.updated_at);
        }
      }, i0 = class e10 {
        constructor(e11, t10, r10, i10) {
          this.userId = e11, this.emailAddress = t10, this.firstName = r10, this.lastName = i10;
        }
        static fromJSON(t10) {
          return new e10(t10.user_id, t10.email_address, t10.first_name, t10.last_name);
        }
      }, i1 = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o2, l2) {
          this.id = e11, this.provider = t10, this.providerUserId = r10, this.active = i10, this.emailAddress = n10, this.firstName = s10, this.lastName = a10, this.verification = o2, this.samlConnection = l2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.provider, t10.provider_user_id, t10.active, t10.email_address, t10.first_name, t10.last_name, t10.verification && iC.fromJSON(t10.verification), t10.saml_connection && iZ.fromJSON(t10.saml_connection));
        }
      }, i2 = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10) {
          this.id = e11, this.userId = t10, this.token = r10, this.status = i10, this.url = n10, this.createdAt = s10, this.updatedAt = a10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.user_id, t10.token, t10.status, t10.url, t10.created_at, t10.updated_at);
        }
      }, i4 = class e10 {
        constructor(e11, t10) {
          this.nextAction = e11, this.supportedStrategies = t10;
        }
        static fromJSON(t10) {
          return new e10(t10.next_action, t10.supported_strategies);
        }
      }, i5 = class e10 {
        constructor(e11, t10, r10, i10) {
          this.emailAddress = e11, this.phoneNumber = t10, this.web3Wallet = r10, this.externalAccount = i10;
        }
        static fromJSON(t10) {
          return new e10(t10.email_address && i4.fromJSON(t10.email_address), t10.phone_number && i4.fromJSON(t10.phone_number), t10.web3_wallet && i4.fromJSON(t10.web3_wallet), t10.external_account);
        }
      }, i3 = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o2, l2, c2, u2, d2, h2, p2, f2, m2, g2, y2, _2, b2, v2, w2) {
          this.id = e11, this.status = t10, this.requiredFields = r10, this.optionalFields = i10, this.missingFields = n10, this.unverifiedFields = s10, this.verifications = a10, this.username = o2, this.emailAddress = l2, this.phoneNumber = c2, this.web3Wallet = u2, this.passwordEnabled = d2, this.firstName = h2, this.lastName = p2, this.customAction = f2, this.externalId = m2, this.createdSessionId = g2, this.createdUserId = y2, this.abandonAt = _2, this.legalAcceptedAt = b2, this.publicMetadata = v2, this.unsafeMetadata = w2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.status, t10.required_fields, t10.optional_fields, t10.missing_fields, t10.unverified_fields, t10.verifications ? i5.fromJSON(t10.verifications) : null, t10.username, t10.email_address, t10.phone_number, t10.web3_wallet, t10.password_enabled, t10.first_name, t10.last_name, t10.custom_action, t10.external_id, t10.created_session_id, t10.created_user_id, t10.abandon_at, t10.legal_accepted_at, t10.public_metadata, t10.unsafe_metadata);
        }
      }, i6 = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10) {
          this.id = e11, this.fromPhoneNumber = t10, this.toPhoneNumber = r10, this.message = i10, this.status = n10, this.phoneNumberId = s10, this.data = a10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.from_phone_number, t10.to_phone_number, t10.message, t10.status, t10.phone_number_id, t10.data);
        }
      }, i9 = class e10 {
        constructor(e11) {
          this.jwt = e11;
        }
        static fromJSON(t10) {
          return new e10(t10.jwt);
        }
      }, i8 = class e10 {
        constructor(e11, t10, r10) {
          this.id = e11, this.web3Wallet = t10, this.verification = r10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.web3_wallet, t10.verification && iC.fromJSON(t10.verification));
        }
      }, i7 = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o2, l2, c2, u2, d2, h2, p2, f2, m2, g2, y2, _2, b2 = {}, v2 = {}, w2 = {}, k2 = [], S2 = [], T2 = [], E2 = [], x2 = [], O2, C2, R2 = null, I2, P2) {
          this.id = e11, this.passwordEnabled = t10, this.totpEnabled = r10, this.backupCodeEnabled = i10, this.twoFactorEnabled = n10, this.banned = s10, this.locked = a10, this.createdAt = o2, this.updatedAt = l2, this.imageUrl = c2, this.hasImage = u2, this.primaryEmailAddressId = d2, this.primaryPhoneNumberId = h2, this.primaryWeb3WalletId = p2, this.lastSignInAt = f2, this.externalId = m2, this.username = g2, this.firstName = y2, this.lastName = _2, this.publicMetadata = b2, this.privateMetadata = v2, this.unsafeMetadata = w2, this.emailAddresses = k2, this.phoneNumbers = S2, this.web3Wallets = T2, this.externalAccounts = E2, this.samlAccounts = x2, this.lastActiveAt = O2, this.createOrganizationEnabled = C2, this.createOrganizationsLimit = R2, this.deleteSelfEnabled = I2, this.legalAcceptedAt = P2, this._raw = null;
        }
        get raw() {
          return this._raw;
        }
        static fromJSON(t10) {
          let r10 = new e10(t10.id, t10.password_enabled, t10.totp_enabled, t10.backup_code_enabled, t10.two_factor_enabled, t10.banned, t10.locked, t10.created_at, t10.updated_at, t10.image_url, t10.has_image, t10.primary_email_address_id, t10.primary_phone_number_id, t10.primary_web3_wallet_id, t10.last_sign_in_at, t10.external_id, t10.username, t10.first_name, t10.last_name, t10.public_metadata, t10.private_metadata, t10.unsafe_metadata, (t10.email_addresses || []).map((e11) => iR.fromJSON(e11)), (t10.phone_numbers || []).map((e11) => iG.fromJSON(e11)), (t10.web3_wallets || []).map((e11) => i8.fromJSON(e11)), (t10.external_accounts || []).map((e11) => iI.fromJSON(e11)), (t10.saml_accounts || []).map((e11) => i1.fromJSON(e11)), t10.last_active_at, t10.create_organization_enabled, t10.create_organizations_limit, t10.delete_self_enabled, t10.legal_accepted_at);
          return r10._raw = t10, r10;
        }
        get primaryEmailAddress() {
          return this.emailAddresses.find(({ id: e11 }) => e11 === this.primaryEmailAddressId) ?? null;
        }
        get primaryPhoneNumber() {
          return this.phoneNumbers.find(({ id: e11 }) => e11 === this.primaryPhoneNumberId) ?? null;
        }
        get primaryWeb3Wallet() {
          return this.web3Wallets.find(({ id: e11 }) => e11 === this.primaryWeb3WalletId) ?? null;
        }
        get fullName() {
          return [this.firstName, this.lastName].join(" ").trim() || null;
        }
      }, ne = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10) {
          this.id = e11, this.emailAddress = t10, this.status = r10, this.invitation = i10, this.createdAt = n10, this.updatedAt = s10, this.isLocked = a10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.email_address, t10.status, t10.invitation && iM.fromJSON(t10.invitation), t10.created_at, t10.updated_at, t10.is_locked);
        }
      }, nt = class e10 {
        constructor(e11, t10, r10, i10, n10) {
          this.id = e11, this.name = t10, this.description = r10, this.slug = i10, this.avatarUrl = n10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.name, t10.description, t10.slug, t10.avatar_url);
        }
      }, nr = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o2, l2, c2, u2, d2, h2, p2) {
          this.id = e11, this.productId = t10, this.name = r10, this.slug = i10, this.description = n10, this.isDefault = s10, this.isRecurring = a10, this.hasBaseFee = o2, this.publiclyVisible = l2, this.fee = c2, this.annualFee = u2, this.annualMonthlyFee = d2, this.forPayerType = h2, this.features = p2;
        }
        static fromJSON(t10) {
          let r10 = (e11) => ({ amount: e11.amount, amountFormatted: e11.amount_formatted, currency: e11.currency, currencySymbol: e11.currency_symbol });
          return new e10(t10.id, t10.product_id, t10.name, t10.slug, t10.description, t10.is_default, t10.is_recurring, t10.has_base_fee, t10.publicly_visible, r10(t10.fee), r10(t10.annual_fee), r10(t10.annual_monthly_fee), t10.for_payer_type, t10.features.map((e11) => nt.fromJSON(e11)));
        }
      }, ni = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o2, l2, c2, u2, d2, h2, p2, f2, m2, g2) {
          this.id = e11, this.status = t10, this.planPeriod = r10, this.periodStart = i10, this.nextPayment = n10, this.amount = s10, this.plan = a10, this.planId = o2, this.createdAt = l2, this.updatedAt = c2, this.periodEnd = u2, this.canceledAt = d2, this.pastDueAt = h2, this.endedAt = p2, this.payerId = f2, this.isFreeTrial = m2, this.lifetimePaid = g2;
        }
        static fromJSON(t10) {
          function r10(e11) {
            return e11 ? { amount: e11.amount, amountFormatted: e11.amount_formatted, currency: e11.currency, currencySymbol: e11.currency_symbol } : e11;
          }
          return new e10(t10.id, t10.status, t10.plan_period, t10.period_start, t10.next_payment, r10(t10.amount), nr.fromJSON(t10.plan), t10.plan_id, t10.created_at, t10.updated_at, t10.period_end, t10.canceled_at, t10.past_due_at, t10.ended_at, t10.payer_id, t10.is_free_trial, r10(t10.lifetime_paid));
        }
      }, nn = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o2, l2, c2) {
          this.id = e11, this.status = t10, this.payerId = r10, this.createdAt = i10, this.updatedAt = n10, this.activeAt = s10, this.pastDueAt = a10, this.subscriptionItems = o2, this.nextPayment = l2, this.eligibleForFreeTrial = c2;
        }
        static fromJSON(t10) {
          let r10 = t10.next_payment ? { date: t10.next_payment.date, amount: { amount: t10.next_payment.amount.amount, amountFormatted: t10.next_payment.amount.amount_formatted, currency: t10.next_payment.amount.currency, currencySymbol: t10.next_payment.amount.currency_symbol } } : null;
          return new e10(t10.id, t10.status, t10.payer_id, t10.created_at, t10.updated_at, t10.active_at ?? null, t10.past_due_at ?? null, t10.subscription_items.map((e11) => ni.fromJSON(e11)), r10, t10.eligible_for_free_trial ?? false);
        }
      };
      function ns(e10) {
        if ("string" != typeof e10 && "object" in e10 && "deleted" in e10) return iT.fromJSON(e10);
        switch (e10.object) {
          case iL.AccountlessApplication:
            return ip.fromJSON(e10);
          case iL.ActorToken:
            return im.fromJSON(e10);
          case iL.AllowlistIdentifier:
            return ig.fromJSON(e10);
          case iL.ApiKey:
            return iy.fromJSON(e10);
          case iL.BlocklistIdentifier:
            return i_.fromJSON(e10);
          case iL.Client:
            return iw.fromJSON(e10);
          case iL.Cookies:
            return iS.fromJSON(e10);
          case iL.Domain:
            return iE.fromJSON(e10);
          case iL.EmailAddress:
            return iR.fromJSON(e10);
          case iL.Email:
            return ix.fromJSON(e10);
          case iL.IdpOAuthAccessToken:
            return iP.fromJSON(e10);
          case iL.Instance:
            return iA.fromJSON(e10);
          case iL.InstanceRestrictions:
            return iN.fromJSON(e10);
          case iL.InstanceSettings:
            return iU.fromJSON(e10);
          case iL.Invitation:
            return iM.fromJSON(e10);
          case iL.JwtTemplate:
            return iB.fromJSON(e10);
          case iL.Machine:
            return iD.fromJSON(e10);
          case iL.MachineScope:
            return iq.fromJSON(e10);
          case iL.MachineSecretKey:
            return ij.fromJSON(e10);
          case iL.M2MToken:
            return iH.fromJSON(e10);
          case iL.OauthAccessToken:
            return iz.fromJSON(e10);
          case iL.OAuthApplication:
            return iK.fromJSON(e10);
          case iL.Organization:
            return iJ.fromJSON(e10);
          case iL.OrganizationInvitation:
            return i$.fromJSON(e10);
          case iL.OrganizationMembership:
            return iF.fromJSON(e10);
          case iL.OrganizationSettings:
            return iV.fromJSON(e10);
          case iL.PhoneNumber:
            return iG.fromJSON(e10);
          case iL.ProxyCheck:
            return iX.fromJSON(e10);
          case iL.RedirectUrl:
            return iQ.fromJSON(e10);
          case iL.SamlConnection:
            return iY.fromJSON(e10);
          case iL.SignInToken:
            return i2.fromJSON(e10);
          case iL.SignUpAttempt:
            return i3.fromJSON(e10);
          case iL.Session:
            return iv.fromJSON(e10);
          case iL.SmsMessage:
            return i6.fromJSON(e10);
          case iL.Token:
            return i9.fromJSON(e10);
          case iL.TotalCount:
            return e10.total_count;
          case iL.User:
            return i7.fromJSON(e10);
          case iL.WaitlistEntry:
            return ne.fromJSON(e10);
          case iL.CommercePlan:
            return nr.fromJSON(e10);
          case iL.CommerceSubscription:
            return nn.fromJSON(e10);
          case iL.CommerceSubscriptionItem:
            return ni.fromJSON(e10);
          case iL.Feature:
            return nt.fromJSON(e10);
          default:
            return e10;
        }
      }
      function na(e10) {
        var t10;
        return t10 = async (t11) => {
          let r10, { secretKey: i10, machineSecretKey: n10, useMachineSecretKey: s10 = false, requireSecretKey: a10 = true, apiUrl: o2 = tY, apiVersion: l2 = "v1", userAgent: c2 = tZ, skipApiVersionInUrl: u2 = false } = e10, { path: d2, method: h2, queryParams: p2, headerParams: f2, bodyParams: m2, formData: g2, options: y2 } = t11, { deepSnakecaseBodyParamKeys: _2 = false } = y2 || {};
          a10 && t9(i10);
          let b2 = new URL(u2 ? rr(o2, d2) : rr(o2, l2, d2));
          if (p2) for (let [e11, t12] of Object.entries(ih({ ...p2 }))) t12 && [t12].flat().forEach((t13) => b2.searchParams.append(e11, t13));
          let v2 = new Headers({ "Clerk-API-Version": t0, [t4.Headers.UserAgent]: c2, ...f2 }), w2 = t4.Headers.Authorization;
          !v2.has(w2) && (s10 && n10 ? v2.set(w2, `Bearer ${n10}`) : i10 && v2.set(w2, `Bearer ${i10}`));
          try {
            var k2;
            g2 ? r10 = await tO.fetch(b2.href, { method: h2, headers: v2, body: g2 }) : (v2.set("Content-Type", "application/json"), r10 = await tO.fetch(b2.href, { method: h2, headers: v2, ...(() => {
              if (!("GET" !== h2 && m2 && Object.keys(m2).length > 0)) return null;
              let e12 = (e13) => ih(e13, { deep: _2 });
              return { body: JSON.stringify(Array.isArray(m2) ? m2.map(e12) : e12(m2)) };
            })() }));
            let e11 = r10?.headers && r10.headers?.get(t4.Headers.ContentType) === t4.ContentTypes.Json, t12 = await (e11 ? r10.json() : r10.text());
            if (!r10.ok) return { data: null, errors: nc(t12), status: r10?.status, statusText: r10?.statusText, clerkTraceId: no(t12, r10?.headers), retryAfter: nl(r10?.headers) };
            return { ...Array.isArray(t12) ? { data: t12.map((e12) => ns(e12)) } : (k2 = t12) && "object" == typeof k2 && "data" in k2 && Array.isArray(k2.data) && void 0 !== k2.data ? { data: t12.data.map((e12) => ns(e12)), totalCount: t12.total_count } : { data: ns(t12) }, errors: null };
          } catch (e11) {
            if (e11 instanceof Error) return { data: null, errors: [{ code: "unexpected_error", message: e11.message || "Unexpected error" }], clerkTraceId: no(e11, r10?.headers) };
            return { data: null, errors: nc(e11), status: r10?.status, statusText: r10?.statusText, clerkTraceId: no(e11, r10?.headers), retryAfter: nl(r10?.headers) };
          }
        }, async (...e11) => {
          let { data: r10, errors: i10, totalCount: n10, status: s10, statusText: a10, clerkTraceId: o2, retryAfter: l2 } = await t10(...e11);
          if (i10) {
            let e12 = new tf(a10 || "", { data: [], status: s10, clerkTraceId: o2, retryAfter: l2 });
            throw e12.errors = i10, e12;
          }
          return void 0 !== n10 ? { data: r10, totalCount: n10 } : r10;
        };
      }
      function no(e10, t10) {
        return e10 && "object" == typeof e10 && "clerk_trace_id" in e10 && "string" == typeof e10.clerk_trace_id ? e10.clerk_trace_id : t10?.get("cf-ray") || "";
      }
      function nl(e10) {
        let t10 = e10?.get("Retry-After");
        if (!t10) return;
        let r10 = parseInt(t10, 10);
        if (!isNaN(r10)) return r10;
      }
      function nc(e10) {
        if (e10 && "object" == typeof e10 && "errors" in e10) {
          let t10 = e10.errors;
          return t10.length > 0 ? t10.map(tp) : [];
        }
        return [];
      }
      function nu(e10) {
        let t10 = na(e10);
        return { __experimental_accountlessApplications: new ro(na({ ...e10, requireSecretKey: false })), actorTokens: new rs(t10), allowlistIdentifiers: new rc(t10), apiKeys: new rd(na({ ...e10, skipApiVersionInUrl: true })), betaFeatures: new rh(t10), blocklistIdentifiers: new rf(t10), billing: new r5(t10), clients: new rg(t10), domains: new r_(t10), emailAddresses: new rv(t10), idPOAuthAccessToken: new rw(na({ ...e10, skipApiVersionInUrl: true })), instance: new rS(t10), invitations: new rE(t10), jwks: new rI(t10), jwtTemplates: new rA(t10), machines: new rO(t10), m2m: new rR(na({ ...e10, skipApiVersionInUrl: true, requireSecretKey: false, useMachineSecretKey: true })), oauthApplications: new rL(t10), organizations: new rU(t10), phoneNumbers: new rq(t10), proxyChecks: new rj(t10), redirectUrls: new rB(t10), samlConnections: new rK(t10), sessions: new r$(t10), signInTokens: new rW(t10), signUps: new rG(t10), testingTokens: new rX(t10), users: new rY(t10), waitlistEntries: new r0(t10), webhooks: new r2(t10) };
      }
      var nd = "oat_", nh = ["mt_", nd, "ak_"];
      function np(e10) {
        return nh.some((t10) => e10.startsWith(t10));
      }
      function nf(e10) {
        if (e10.startsWith("mt_")) return t8.M2MToken;
        if (e10.startsWith(nd)) return t8.OAuthToken;
        if (e10.startsWith("ak_")) return t8.ApiKey;
        throw Error("Unknown machine token type");
      }
      var nm = (e10, t10) => !!e10 && ("any" === t10 || (Array.isArray(t10) ? t10 : [t10]).includes(e10)), ng = (e10) => () => {
        let t10 = { ...e10 };
        return t10.secretKey = (t10.secretKey || "").substring(0, 7), t10.jwtKey = (t10.jwtKey || "").substring(0, 7), { ...t10 };
      };
      function ny(e10, t10) {
        return { tokenType: t8.SessionToken, sessionClaims: null, sessionId: null, sessionStatus: t10 ?? null, userId: null, actor: null, orgId: null, orgRole: null, orgSlug: null, orgPermissions: null, factorVerificationAge: null, getToken: () => Promise.resolve(null), has: () => false, debug: ng(e10), isAuthenticated: false };
      }
      function n_(e10, t10) {
        let r10 = { id: null, subject: null, scopes: null, has: () => false, getToken: () => Promise.resolve(null), debug: ng(t10), isAuthenticated: false };
        switch (e10) {
          case t8.ApiKey:
            return { ...r10, tokenType: e10, name: null, claims: null, scopes: null, userId: null, orgId: null };
          case t8.M2MToken:
            return { ...r10, tokenType: e10, claims: null, scopes: null, machineId: null };
          case t8.OAuthToken:
            return { ...r10, tokenType: e10, scopes: null, userId: null, clientId: null };
          default:
            throw Error(`Invalid token type: ${e10}`);
        }
      }
      function nb() {
        return { isAuthenticated: false, tokenType: null, getToken: () => Promise.resolve(null), has: () => false, debug: () => ({}) };
      }
      var nv = ({ authObject: e10, acceptsToken: t10 = t8.SessionToken }) => "any" === t10 ? e10 : Array.isArray(t10) ? nm(e10.tokenType, t10) ? e10 : nb() : nm(e10.tokenType, t10) ? e10 : !function(e11) {
        return e11 === t8.ApiKey || e11 === t8.M2MToken || e11 === t8.OAuthToken;
      }(t10) ? ny(e10.debug) : n_(t10, e10.debug), nw = { SignedIn: "signed-in", SignedOut: "signed-out", Handshake: "handshake" }, nk = { ClientUATWithoutSessionToken: "client-uat-but-no-session-token", DevBrowserMissing: "dev-browser-missing", DevBrowserSync: "dev-browser-sync", PrimaryRespondsToSyncing: "primary-responds-to-syncing", PrimaryDomainCrossOriginSync: "primary-domain-cross-origin-sync", SatelliteCookieNeedsSyncing: "satellite-needs-syncing", SessionTokenAndUATMissing: "session-token-and-uat-missing", SessionTokenMissing: "session-token-missing", SessionTokenExpired: "session-token-expired", SessionTokenIATBeforeClientUAT: "session-token-iat-before-client-uat", SessionTokenNBF: "session-token-nbf", SessionTokenIatInTheFuture: "session-token-iat-in-the-future", SessionTokenWithoutClientUAT: "session-token-but-no-client-uat", ActiveOrganizationMismatch: "active-organization-mismatch", TokenTypeMismatch: "token-type-mismatch", UnexpectedError: "unexpected-error" };
      function nS(e10) {
        let { authenticateContext: t10, headers: r10 = new Headers(), token: i10 } = e10;
        return { status: nw.SignedIn, reason: null, message: null, proxyUrl: t10.proxyUrl || "", publishableKey: t10.publishableKey || "", isSatellite: t10.isSatellite || false, domain: t10.domain || "", signInUrl: t10.signInUrl || "", signUpUrl: t10.signUpUrl || "", afterSignInUrl: t10.afterSignInUrl || "", afterSignUpUrl: t10.afterSignUpUrl || "", isSignedIn: true, isAuthenticated: true, tokenType: e10.tokenType, toAuth: ({ treatPendingAsSignedOut: r11 = true } = {}) => {
          if (e10.tokenType === t8.SessionToken) {
            let { sessionClaims: n11 } = e10, s11 = function(e11, t11, r12) {
              let i11, { actor: n12, sessionId: s12, sessionStatus: a11, userId: o2, orgId: l2, orgRole: c2, orgSlug: u2, orgPermissions: d2, factorVerificationAge: h2 } = ((e12) => {
                let t12, r13, i12, n13, s13 = e12.fva ?? null, a12 = e12.sts ?? null;
                if (2 === e12.v) {
                  if (e12.o) {
                    t12 = e12.o?.id, i12 = e12.o?.slg, e12.o?.rol && (r13 = `org:${e12.o?.rol}`);
                    let { org: s14 } = tW(e12.fea), { permissions: a13, featurePermissionMap: o3 } = (({ per: e13, fpm: t13 }) => {
                      if (!e13 || !t13) return { permissions: [], featurePermissionMap: [] };
                      let r14 = e13.split(",").map((e14) => e14.trim()), i13 = t13.split(",").map((e14) => Number.parseInt(e14.trim(), 10)).map((e14) => e14.toString(2).padStart(r14.length, "0").split("").map((e15) => Number.parseInt(e15, 10)).reverse()).filter(Boolean);
                      return { permissions: r14, featurePermissionMap: i13 };
                    })({ per: e12.o?.per, fpm: e12.o?.fpm });
                    n13 = function({ features: e13, permissions: t13, featurePermissionMap: r14 }) {
                      if (!e13 || !t13 || !r14) return [];
                      let i13 = [];
                      for (let n14 = 0; n14 < e13.length; n14++) {
                        let s15 = e13[n14];
                        if (n14 >= r14.length) continue;
                        let a14 = r14[n14];
                        if (a14) for (let e14 = 0; e14 < a14.length; e14++) 1 === a14[e14] && i13.push(`org:${s15}:${t13[e14]}`);
                      }
                      return i13;
                    }({ features: s14, featurePermissionMap: o3, permissions: a13 });
                  }
                } else t12 = e12.org_id, r13 = e12.org_role, i12 = e12.org_slug, n13 = e12.org_permissions;
                return { sessionClaims: e12, sessionId: e12.sid, sessionStatus: a12, actor: e12.act, userId: e12.sub, orgId: t12, orgRole: r13, orgSlug: i12, orgPermissions: n13, factorVerificationAge: s13 };
              })(r12), p2 = nu(e11), f2 = ((e12) => {
                let { fetcher: t12, sessionToken: r13, sessionId: i12 } = e12 || {};
                return async (e13 = {}) => i12 ? e13.template || void 0 !== e13.expiresInSeconds ? t12(i12, e13.template, e13.expiresInSeconds) : r13 : null;
              })({ sessionId: s12, sessionToken: t11, fetcher: async (e12, t12, r13) => (await p2.sessions.getToken(e12, t12 || "", r13)).jwt });
              return { tokenType: t8.SessionToken, actor: n12, sessionClaims: r12, sessionId: s12, sessionStatus: a11, userId: o2, orgId: l2, orgRole: c2, orgSlug: u2, orgPermissions: d2, factorVerificationAge: h2, getToken: f2, has: (i11 = { orgId: l2, orgRole: c2, orgPermissions: d2, userId: o2, factorVerificationAge: h2, features: r12.fea || "", plans: r12.pla || "" }, (e12) => {
                if (!i11.userId) return false;
                let t12 = ((e13, t13) => {
                  let { features: r14, plans: i12 } = t13;
                  return e13.feature && r14 ? tF(r14, e13.feature) : e13.plan && i12 ? tF(i12, e13.plan) : null;
                })(e12, i11), r13 = ((e13, t13) => {
                  let { orgId: r14, orgRole: i12, orgPermissions: n14 } = t13;
                  return (e13.role || e13.permission) && r14 && i12 && n14 ? e13.permission ? n14.includes(t$(e13.permission)) : e13.role ? t$(i12) === t$(e13.role) : null : null;
                })(e12, i11), n13 = ((e13, { factorVerificationAge: t13 }) => {
                  if (!e13.reverification || !t13) return null;
                  let r14 = ((e14) => {
                    let t14, r15;
                    if (!e14) return false;
                    let i13 = "string" == typeof e14 && tJ.has(e14), n15 = "object" == typeof e14 && (t14 = e14.level, tK.has(t14)) && "number" == typeof (r15 = e14.afterMinutes) && r15 > 0;
                    return (!!i13 || !!n15) && ((e15) => "string" == typeof e15 ? tz[e15] : e15).bind(null, e14);
                  })(e13.reverification);
                  if (!r14) return null;
                  let { level: i12, afterMinutes: n14 } = r14(), [s13, a12] = t13, o3 = -1 !== s13 ? n14 > s13 : null, l3 = -1 !== a12 ? n14 > a12 : null;
                  switch (i12) {
                    case "first_factor":
                      return o3;
                    case "second_factor":
                      return -1 !== a12 ? l3 : o3;
                    case "multi_factor":
                      return -1 === a12 ? o3 : o3 && l3;
                  }
                })(e12, i11);
                return [t12 || r13, n13].some((e13) => null === e13) ? [t12 || r13, n13].some((e13) => true === e13) : [t12 || r13, n13].every((e13) => true === e13);
              }), debug: ng({ ...e11, sessionToken: t11 }), isAuthenticated: true };
            }(t10, i10, n11);
            return r11 && "pending" === s11.sessionStatus ? ny(void 0, s11.sessionStatus) : s11;
          }
          let { machineData: n10 } = e10;
          var s10 = e10.tokenType;
          let a10 = { id: n10.id, subject: n10.subject, getToken: () => Promise.resolve(i10), has: () => false, debug: ng(t10), isAuthenticated: true };
          switch (s10) {
            case t8.ApiKey:
              return { ...a10, tokenType: s10, name: n10.name, claims: n10.claims, scopes: n10.scopes, userId: n10.subject.startsWith("user_") ? n10.subject : null, orgId: n10.subject.startsWith("org_") ? n10.subject : null };
            case t8.M2MToken:
              return { ...a10, tokenType: s10, claims: n10.claims, scopes: n10.scopes, machineId: n10.subject };
            case t8.OAuthToken:
              return { ...a10, tokenType: s10, scopes: n10.scopes, userId: n10.subject, clientId: n10.clientId };
            default:
              throw Error(`Invalid token type: ${s10}`);
          }
        }, headers: r10, token: i10 };
      }
      function nT(e10) {
        let { authenticateContext: t10, headers: r10 = new Headers(), reason: i10, message: n10 = "", tokenType: s10 } = e10;
        return nE({ status: nw.SignedOut, reason: i10, message: n10, proxyUrl: t10.proxyUrl || "", publishableKey: t10.publishableKey || "", isSatellite: t10.isSatellite || false, domain: t10.domain || "", signInUrl: t10.signInUrl || "", signUpUrl: t10.signUpUrl || "", afterSignInUrl: t10.afterSignInUrl || "", afterSignUpUrl: t10.afterSignUpUrl || "", isSignedIn: false, isAuthenticated: false, tokenType: s10, toAuth: () => s10 === t8.SessionToken ? ny({ ...t10, status: nw.SignedOut, reason: i10, message: n10 }) : n_(s10, { reason: i10, message: n10, headers: r10 }), headers: r10, token: null });
      }
      var nE = (e10) => {
        let t10 = new Headers(e10.headers || {});
        if (e10.message) try {
          t10.set(t4.Headers.AuthMessage, e10.message);
        } catch {
        }
        if (e10.reason) try {
          t10.set(t4.Headers.AuthReason, e10.reason);
        } catch {
        }
        if (e10.status) try {
          t10.set(t4.Headers.AuthStatus, e10.status);
        } catch {
        }
        return e10.headers = t10, e10;
      }, nx = class extends URL {
        isCrossOrigin(e10) {
          return this.origin !== new URL(e10.toString()).origin;
        }
      }, nO = (...e10) => new nx(...e10), nC = class extends Request {
        constructor(e10, t10) {
          super("string" != typeof e10 && "url" in e10 ? e10.url : String(e10), t10 || "string" == typeof e10 ? void 0 : e10), this.clerkUrl = this.deriveUrlFromHeaders(this), this.cookies = this.parseCookies(this);
        }
        toJSON() {
          return { url: this.clerkUrl.href, method: this.method, headers: JSON.stringify(Object.fromEntries(this.headers)), clerkUrl: this.clerkUrl.toString(), cookies: JSON.stringify(Object.fromEntries(this.cookies)) };
        }
        deriveUrlFromHeaders(e10) {
          let t10 = new URL(e10.url), r10 = e10.headers.get(t4.Headers.ForwardedProto), i10 = e10.headers.get(t4.Headers.ForwardedHost), n10 = e10.headers.get(t4.Headers.Host), s10 = t10.protocol, a10 = this.getFirstValueFromHeader(i10) ?? n10, o2 = this.getFirstValueFromHeader(r10) ?? s10?.replace(/[:/]/, ""), l2 = a10 && o2 ? `${o2}://${a10}` : t10.origin;
          return l2 === t10.origin ? nO(t10) : nO(t10.pathname + t10.search, l2);
        }
        getFirstValueFromHeader(e10) {
          return e10?.split(",")[0];
        }
        parseCookies(e10) {
          return new Map(Object.entries((0, tV.parse)(this.decodeCookieValue(e10.headers.get("cookie") || ""))));
        }
        decodeCookieValue(e10) {
          return e10 ? e10.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent) : e10;
        }
      }, nR = (...e10) => e10[0] instanceof nC ? e10[0] : new nC(...e10), nI = (e10) => e10.split(";")[0]?.split("=")[0], nP = (e10) => e10.split(";")[0]?.split("=")[1], nA = {}, nN = 0;
      function nU(e10, t10 = true) {
        nA[e10.kid] = e10, nN = t10 ? Date.now() : -1;
      }
      var nM = "local";
      function nL(e10) {
        if (!nA[nM]) {
          if (!e10) throw new tk({ action: tw.SetClerkJWTKey, message: "Missing local JWK.", reason: tv.LocalJWKMissing });
          nU({ kid: "local", kty: "RSA", alg: "RS256", n: e10.replace(/\r\n|\n|\r/g, "").replace("-----BEGIN PUBLIC KEY-----", "").replace("-----END PUBLIC KEY-----", "").replace("MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA", "").replace("IDAQAB", "").replace(/\+/g, "-").replace(/\//g, "_"), e: "AQAB" }, false);
        }
        return nA[nM];
      }
      async function nD({ secretKey: e10, apiUrl: t10 = tY, apiVersion: r10 = "v1", kid: i10, skipJwksCache: n10 }) {
        if (n10 || function() {
          if (-1 === nN) return false;
          let e11 = Date.now() - nN >= 3e5;
          return e11 && (nA = {}), e11;
        }() || !nA[i10]) {
          if (!e10) throw new tk({ action: tw.ContactSupport, message: "Failed to load JWKS from Clerk Backend or Frontend API.", reason: tv.RemoteJWKFailedToLoad });
          let { keys: i11 } = await ti(() => nq(t10, e10, r10));
          if (!i11 || !i11.length) throw new tk({ action: tw.ContactSupport, message: "The JWKS endpoint did not contain any signing keys. Contact support@clerk.com.", reason: tv.RemoteJWKFailedToLoad });
          i11.forEach((e11) => nU(e11));
        }
        let s10 = nA[i10];
        if (!s10) {
          let e11 = Object.values(nA).map((e12) => e12.kid).sort().join(", ");
          throw new tk({ action: `Go to your Dashboard and validate your secret and public keys are correct. ${tw.ContactSupport} if the issue persists.`, message: `Unable to find a signing key in JWKS that matches the kid='${i10}' of the provided session token. Please make sure that the __session cookie or the HTTP authorization header contain a Clerk-generated session JWT. The following kid is available: ${e11}`, reason: tv.JWKKidMismatch });
        }
        return s10;
      }
      async function nq(e10, t10, r10) {
        if (!t10) throw new tk({ action: tw.SetClerkSecretKey, message: "Missing Clerk Secret Key or API Key. Go to https://dashboard.clerk.com and get your key for your instance.", reason: tv.RemoteJWKFailedToLoad });
        let i10 = new URL(e10);
        i10.pathname = rr(i10.pathname, r10, "/jwks");
        let n10 = await tO.fetch(i10.href, { headers: { Authorization: `Bearer ${t10}`, "Clerk-API-Version": t0, "Content-Type": "application/json", "User-Agent": tZ } });
        if (!n10.ok) {
          let e11 = await n10.json(), t11 = nj(e11?.errors, tb.InvalidSecretKey);
          if (t11) {
            let e12 = tv.InvalidSecretKey;
            throw new tk({ action: tw.ContactSupport, message: t11.message, reason: e12 });
          }
          throw new tk({ action: tw.ContactSupport, message: `Error loading Clerk JWKS from ${i10.href} with code=${n10.status}`, reason: tv.RemoteJWKFailedToLoad });
        }
        return n10.json();
      }
      var nj = (e10, t10) => e10 ? e10.find((e11) => e11.code === t10) : null;
      async function nH(e10, t10) {
        let { data: r10, errors: i10 } = tD(e10);
        if (i10) return { errors: i10 };
        let { header: n10 } = r10, { kid: s10 } = n10;
        try {
          let r11;
          if (t10.jwtKey) r11 = nL(t10.jwtKey);
          else {
            if (!t10.secretKey) return { errors: [new tk({ action: tw.SetClerkJWTKey, message: "Failed to resolve JWK during verification.", reason: tv.JWKFailedToResolve })] };
            r11 = await nD({ ...t10, kid: s10 });
          }
          return await tq(e10, { ...t10, key: r11 });
        } catch (e11) {
          return { errors: [e11] };
        }
      }
      function nB(e10, t10, r10) {
        if (t10 && "clerkError" in t10) {
          let i10, n10;
          switch (t10.status) {
            case 401:
              i10 = tS.InvalidSecretKey, n10 = t10.errors[0]?.message || "Invalid secret key";
              break;
            case 404:
              i10 = tS.TokenInvalid, n10 = r10;
              break;
            default:
              i10 = tS.UnexpectedError, n10 = "Unexpected error";
          }
          return { data: void 0, tokenType: e10, errors: [new tT({ message: n10, code: i10, status: t10.status })] };
        }
        return { data: void 0, tokenType: e10, errors: [new tT({ message: "Unexpected error", code: tS.UnexpectedError, status: t10.status })] };
      }
      async function nz(e10, t10) {
        try {
          let r10 = nu(t10);
          return { data: await r10.m2m.verifyToken({ token: e10 }), tokenType: t8.M2MToken, errors: void 0 };
        } catch (e11) {
          return nB(t8.M2MToken, e11, "Machine token not found");
        }
      }
      async function nK(e10, t10) {
        try {
          let r10 = nu(t10);
          return { data: await r10.idPOAuthAccessToken.verifyAccessToken(e10), tokenType: t8.OAuthToken, errors: void 0 };
        } catch (e11) {
          return nB(t8.OAuthToken, e11, "OAuth token not found");
        }
      }
      async function nJ(e10, t10) {
        try {
          let r10 = nu(t10);
          return { data: await r10.apiKeys.verifySecret(e10), tokenType: t8.ApiKey, errors: void 0 };
        } catch (e11) {
          return nB(t8.ApiKey, e11, "API key not found");
        }
      }
      async function n$(e10, t10) {
        if (e10.startsWith("mt_")) return nz(e10, t10);
        if (e10.startsWith(nd)) return nK(e10, t10);
        if (e10.startsWith("ak_")) return nJ(e10, t10);
        throw Error("Unknown machine token type");
      }
      async function nF(e10, { key: t10 }) {
        let { data: r10, errors: i10 } = tD(e10);
        if (i10) throw i10[0];
        let { header: n10, payload: s10 } = r10, { typ: a10, alg: o2 } = n10;
        tU(a10), tM(o2);
        let { data: l2, errors: c2 } = await tL(r10, t10);
        if (c2) throw new tk({ reason: tv.TokenVerificationFailed, message: `Error verifying handshake token. ${c2[0]}` });
        if (!l2) throw new tk({ reason: tv.TokenInvalidSignature, message: "Handshake signature is invalid." });
        return s10;
      }
      async function nW(e10, t10) {
        let r10, { secretKey: i10, apiUrl: n10, apiVersion: s10, jwksCacheTtlInMs: a10, jwtKey: o2, skipJwksCache: l2 } = t10, { data: c2, errors: u2 } = tD(e10);
        if (u2) throw u2[0];
        let { kid: d2 } = c2.header;
        if (o2) r10 = nL(o2);
        else if (i10) r10 = await nD({ secretKey: i10, apiUrl: n10, apiVersion: s10, kid: d2, jwksCacheTtlInMs: a10, skipJwksCache: l2 });
        else throw new tk({ action: tw.SetClerkJWTKey, message: "Failed to resolve JWK during handshake verification.", reason: tv.JWKFailedToResolve });
        return await nF(e10, { key: r10 });
      }
      var nV = class {
        constructor(e10, t10, r10) {
          this.authenticateContext = e10, this.options = t10, this.organizationMatcher = r10;
        }
        isRequestEligibleForHandshake() {
          let { accept: e10, secFetchDest: t10 } = this.authenticateContext;
          return !!("document" === t10 || "iframe" === t10 || !t10 && e10?.startsWith("text/html"));
        }
        buildRedirectToHandshake(e10) {
          if (!this.authenticateContext?.clerkUrl) throw Error("Missing clerkUrl in authenticateContext");
          let t10 = this.removeDevBrowserFromURL(this.authenticateContext.clerkUrl), r10 = this.authenticateContext.frontendApi.startsWith("http") ? this.authenticateContext.frontendApi : `https://${this.authenticateContext.frontendApi}`, i10 = new URL("v1/client/handshake", r10 = r10.replace(/\/+$/, "") + "/");
          i10.searchParams.append("redirect_url", t10?.href || ""), i10.searchParams.append("__clerk_api_version", t0), i10.searchParams.append(t4.QueryParameters.SuffixedCookies, this.authenticateContext.usesSuffixedCookies().toString()), i10.searchParams.append(t4.QueryParameters.HandshakeReason, e10), i10.searchParams.append(t4.QueryParameters.HandshakeFormat, "nonce"), "development" === this.authenticateContext.instanceType && this.authenticateContext.devBrowserToken && i10.searchParams.append(t4.QueryParameters.DevBrowser, this.authenticateContext.devBrowserToken);
          let n10 = this.getOrganizationSyncTarget(this.authenticateContext.clerkUrl, this.organizationMatcher);
          return n10 && this.getOrganizationSyncQueryParams(n10).forEach((e11, t11) => {
            i10.searchParams.append(t11, e11);
          }), new Headers({ [t4.Headers.Location]: i10.href });
        }
        async getCookiesFromHandshake() {
          let e10 = [];
          if (this.authenticateContext.handshakeNonce) try {
            let t10 = await this.authenticateContext.apiClient?.clients.getHandshakePayload({ nonce: this.authenticateContext.handshakeNonce });
            t10 && e10.push(...t10.directives);
          } catch (e11) {
            console.error("Clerk: HandshakeService: error getting handshake payload:", e11);
          }
          else if (this.authenticateContext.handshakeToken) {
            let t10 = await nW(this.authenticateContext.handshakeToken, this.authenticateContext);
            t10 && Array.isArray(t10.handshake) && e10.push(...t10.handshake);
          }
          return e10;
        }
        async resolveHandshake() {
          let e10 = new Headers({ "Access-Control-Allow-Origin": "null", "Access-Control-Allow-Credentials": "true" }), t10 = await this.getCookiesFromHandshake(), r10 = "";
          if (t10.forEach((t11) => {
            e10.append("Set-Cookie", t11), nI(t11).startsWith(t4.Cookies.Session) && (r10 = nP(t11));
          }), "development" === this.authenticateContext.instanceType) {
            let t11 = new URL(this.authenticateContext.clerkUrl);
            t11.searchParams.delete(t4.QueryParameters.Handshake), t11.searchParams.delete(t4.QueryParameters.HandshakeHelp), t11.searchParams.delete(t4.QueryParameters.DevBrowser), e10.append(t4.Headers.Location, t11.toString()), e10.set(t4.Headers.CacheControl, "no-store");
          }
          if ("" === r10) return nT({ tokenType: t8.SessionToken, authenticateContext: this.authenticateContext, reason: nk.SessionTokenMissing, message: "", headers: e10 });
          let { data: i10, errors: [n10] = [] } = await nH(r10, this.authenticateContext);
          if (i10) return nS({ tokenType: t8.SessionToken, authenticateContext: this.authenticateContext, sessionClaims: i10, headers: e10, token: r10 });
          if ("development" === this.authenticateContext.instanceType && (n10?.reason === tv.TokenExpired || n10?.reason === tv.TokenNotActiveYet || n10?.reason === tv.TokenIatInTheFuture)) {
            let t11 = new tk({ action: n10.action, message: n10.message, reason: n10.reason });
            t11.tokenCarrier = "cookie", console.error(`Clerk: Clock skew detected. This usually means that your system clock is inaccurate. Clerk will attempt to account for the clock skew in development.

To resolve this issue, make sure your system's clock is set to the correct time (e.g. turn off and on automatic time synchronization).

---

${t11.getFullMessage()}`);
            let { data: i11, errors: [s10] = [] } = await nH(r10, { ...this.authenticateContext, clockSkewInMs: 864e5 });
            if (i11) return nS({ tokenType: t8.SessionToken, authenticateContext: this.authenticateContext, sessionClaims: i11, headers: e10, token: r10 });
            throw Error(s10?.message || "Clerk: Handshake retry failed.");
          }
          throw Error(n10?.message || "Clerk: Handshake failed.");
        }
        handleTokenVerificationErrorInDevelopment(e10) {
          if (e10.reason === tv.TokenInvalidSignature) throw Error("Clerk: Handshake token verification failed due to an invalid signature. If you have switched Clerk keys locally, clear your cookies and try again.");
          throw Error(`Clerk: Handshake token verification failed: ${e10.getFullMessage()}.`);
        }
        checkAndTrackRedirectLoop(e10) {
          if (3 === this.authenticateContext.handshakeRedirectLoopCounter) return true;
          let t10 = this.authenticateContext.handshakeRedirectLoopCounter + 1, r10 = t4.Cookies.RedirectCount;
          return e10.append("Set-Cookie", `${r10}=${t10}; SameSite=Lax; HttpOnly; Max-Age=2`), false;
        }
        removeDevBrowserFromURL(e10) {
          let t10 = new URL(e10);
          return t10.searchParams.delete(t4.QueryParameters.DevBrowser), t10.searchParams.delete(t4.QueryParameters.LegacyDevBrowser), t10;
        }
        getOrganizationSyncTarget(e10, t10) {
          return t10.findTarget(e10);
        }
        getOrganizationSyncQueryParams(e10) {
          let t10 = /* @__PURE__ */ new Map();
          return "personalAccount" === e10.type && t10.set("organization_id", ""), "organization" === e10.type && (e10.organizationId && t10.set("organization_id", e10.organizationId), e10.organizationSlug && t10.set("organization_id", e10.organizationSlug)), t10;
        }
      }, nG = class {
        constructor(e10) {
          this.organizationPattern = this.createMatcher(e10?.organizationPatterns), this.personalAccountPattern = this.createMatcher(e10?.personalAccountPatterns);
        }
        createMatcher(e10) {
          if (!e10) return null;
          try {
            return function(e11, t10) {
              try {
                var r10, i10, n10, s10, a10, o2, l2;
                return r10 = void 0, i10 = [], n10 = tQ(e11, i10, r10), s10 = i10, a10 = r10, void 0 === a10 && (a10 = {}), o2 = a10.decode, l2 = void 0 === o2 ? function(e12) {
                  return e12;
                } : o2, function(e12) {
                  var t11 = n10.exec(e12);
                  if (!t11) return false;
                  for (var r11 = t11[0], i11 = t11.index, a11 = /* @__PURE__ */ Object.create(null), o3 = 1; o3 < t11.length; o3++) !function(e13) {
                    if (void 0 !== t11[e13]) {
                      var r12 = s10[e13 - 1];
                      "*" === r12.modifier || "+" === r12.modifier ? a11[r12.name] = t11[e13].split(r12.prefix + r12.suffix).map(function(e14) {
                        return l2(e14, r12);
                      }) : a11[r12.name] = l2(t11[e13], r12);
                    }
                  }(o3);
                  return { path: r11, index: i11, params: a11 };
                };
              } catch (e12) {
                throw Error(`Invalid path and options: Consult the documentation of path-to-regexp here: https://github.com/pillarjs/path-to-regexp/tree/6.x
${e12.message}`);
              }
            }(e10);
          } catch (t10) {
            throw Error(`Invalid pattern "${e10}": ${t10}`);
          }
        }
        findTarget(e10) {
          let t10 = this.findOrganizationTarget(e10);
          return t10 || this.findPersonalAccountTarget(e10);
        }
        findOrganizationTarget(e10) {
          if (!this.organizationPattern) return null;
          try {
            let t10 = this.organizationPattern(e10.pathname);
            if (!t10 || !("params" in t10)) return null;
            let r10 = t10.params;
            if (r10.id) return { type: "organization", organizationId: r10.id };
            if (r10.slug) return { type: "organization", organizationSlug: r10.slug };
            return null;
          } catch (e11) {
            return console.error("Failed to match organization pattern:", e11), null;
          }
        }
        findPersonalAccountTarget(e10) {
          if (!this.personalAccountPattern) return null;
          try {
            return this.personalAccountPattern(e10.pathname) ? { type: "personalAccount" } : null;
          } catch (e11) {
            return console.error("Failed to match personal account pattern:", e11), null;
          }
        }
      }, nX = { NonEligibleNoCookie: "non-eligible-no-refresh-cookie", NonEligibleNonGet: "non-eligible-non-get", InvalidSessionToken: "invalid-session-token", MissingApiClient: "missing-api-client", MissingSessionToken: "missing-session-token", MissingRefreshToken: "missing-refresh-token", ExpiredSessionTokenDecodeFailed: "expired-session-token-decode-failed", ExpiredSessionTokenMissingSidClaim: "expired-session-token-missing-sid-claim", FetchError: "fetch-error", UnexpectedSDKError: "unexpected-sdk-error", UnexpectedBAPIError: "unexpected-bapi-error" };
      function nQ(e10, t10, r10) {
        return nm(e10, t10) ? null : nT({ tokenType: "string" == typeof t10 ? t10 : e10, authenticateContext: r10, reason: nk.TokenTypeMismatch });
      }
      var nY = async (e10, t10) => {
        let r10 = await re(nR(e10), t10), i10 = t10.acceptsToken ?? t8.SessionToken;
        if (i10 !== t8.M2MToken && (t9(r10.secretKey), r10.isSatellite)) {
          var n10 = r10.signInUrl, s10 = r10.secretKey;
          if (!n10 && tc(s10)) throw Error("Missing signInUrl. Pass a signInUrl for dev instances if an app is satellite");
          if (r10.signInUrl && r10.origin && function(e11, t11) {
            let r11;
            try {
              r11 = new URL(e11);
            } catch {
              throw Error("The signInUrl needs to have a absolute url format.");
            }
            if (r11.origin === t11) throw Error("The signInUrl needs to be on a different origin than your satellite application.");
          }(r10.signInUrl, r10.origin), !(r10.proxyUrl || r10.domain)) throw Error("Missing domain and proxyUrl. A satellite application needs to specify a domain or a proxyUrl");
        }
        i10 === t8.M2MToken && function(e11) {
          if (!e11.machineSecretKey && !e11.secretKey) throw Error("Machine token authentication requires either a Machine secret key or a Clerk secret key. Ensure a Clerk secret key or Machine secret key is set.");
        }(r10);
        let a10 = new nG(t10.organizationSyncOptions), o2 = new nV(r10, { organizationSyncOptions: t10.organizationSyncOptions }, a10);
        async function l2(r11) {
          if (!t10.apiClient) return { data: null, error: { message: "An apiClient is needed to perform token refresh.", cause: { reason: nX.MissingApiClient } } };
          let { sessionToken: i11, refreshTokenInCookie: n11 } = r11;
          if (!i11) return { data: null, error: { message: "Session token must be provided.", cause: { reason: nX.MissingSessionToken } } };
          if (!n11) return { data: null, error: { message: "Refresh token must be provided.", cause: { reason: nX.MissingRefreshToken } } };
          let { data: s11, errors: a11 } = tD(i11);
          if (!s11 || a11) return { data: null, error: { message: "Unable to decode the expired session token.", cause: { reason: nX.ExpiredSessionTokenDecodeFailed, errors: a11 } } };
          if (!s11?.payload?.sid) return { data: null, error: { message: "Expired session token is missing the `sid` claim.", cause: { reason: nX.ExpiredSessionTokenMissingSidClaim } } };
          try {
            return { data: (await t10.apiClient.sessions.refreshSession(s11.payload.sid, { format: "cookie", suffixed_cookies: r11.usesSuffixedCookies(), expired_token: i11 || "", refresh_token: n11 || "", request_origin: r11.clerkUrl.origin, request_headers: Object.fromEntries(Array.from(e10.headers.entries()).map(([e11, t11]) => [e11, [t11]])) })).cookies, error: null };
          } catch (e11) {
            if (!e11?.errors?.length) return { data: null, error: { message: "Unexpected Server/BAPI error", cause: { reason: nX.UnexpectedBAPIError, errors: [e11] } } };
            if ("unexpected_error" === e11.errors[0].code) return { data: null, error: { message: "Fetch unexpected error", cause: { reason: nX.FetchError, errors: e11.errors } } };
            return { data: null, error: { message: e11.errors[0].code, cause: { reason: e11.errors[0].code, errors: e11.errors } } };
          }
        }
        async function c2(e11) {
          let { data: t11, error: r11 } = await l2(e11);
          if (!t11 || 0 === t11.length) return { data: null, error: r11 };
          let i11 = new Headers(), n11 = "";
          t11.forEach((e12) => {
            i11.append("Set-Cookie", e12), nI(e12).startsWith(t4.Cookies.Session) && (n11 = nP(e12));
          });
          let { data: s11, errors: a11 } = await nH(n11, e11);
          return a11 ? { data: null, error: { message: "Clerk: unable to verify refreshed session token.", cause: { reason: nX.InvalidSessionToken, errors: a11 } } } : { data: { jwtPayload: s11, sessionToken: n11, headers: i11 }, error: null };
        }
        function u2(e11, t11, r11, i11) {
          if (!o2.isRequestEligibleForHandshake()) return nT({ tokenType: t8.SessionToken, authenticateContext: e11, reason: t11, message: r11 });
          let n11 = i11 ?? o2.buildRedirectToHandshake(t11);
          return (n11.get(t4.Headers.Location) && n11.set(t4.Headers.CacheControl, "no-store"), o2.checkAndTrackRedirectLoop(n11)) ? (console.log("Clerk: Refreshing the session token resulted in an infinite redirect loop. This usually means that your Clerk instance keys do not match - make sure to copy the correct publishable and secret keys from the Clerk dashboard."), nT({ tokenType: t8.SessionToken, authenticateContext: e11, reason: t11, message: r11 })) : function(e12, t12, r12 = "", i12) {
            return nE({ status: nw.Handshake, reason: t12, message: r12, publishableKey: e12.publishableKey || "", isSatellite: e12.isSatellite || false, domain: e12.domain || "", proxyUrl: e12.proxyUrl || "", signInUrl: e12.signInUrl || "", signUpUrl: e12.signUpUrl || "", afterSignInUrl: e12.afterSignInUrl || "", afterSignUpUrl: e12.afterSignUpUrl || "", isSignedIn: false, isAuthenticated: false, tokenType: t8.SessionToken, toAuth: () => null, headers: i12, token: null });
          }(e11, t11, r11, n11);
        }
        async function d2() {
          let { tokenInHeader: e11 } = r10;
          try {
            let { data: t11, errors: i11 } = await nH(e11, r10);
            if (i11) throw i11[0];
            return nS({ tokenType: t8.SessionToken, authenticateContext: r10, sessionClaims: t11, headers: new Headers(), token: e11 });
          } catch (e12) {
            return p2(e12, "header");
          }
        }
        async function h2() {
          let e11 = r10.clientUat, t11 = !!r10.sessionTokenInCookie, i11 = !!r10.devBrowserToken;
          if (r10.handshakeNonce || r10.handshakeToken) try {
            return await o2.resolveHandshake();
          } catch (e12) {
            e12 instanceof tk && "development" === r10.instanceType ? o2.handleTokenVerificationErrorInDevelopment(e12) : console.error("Clerk: unable to resolve handshake:", e12);
          }
          if ("development" === r10.instanceType && r10.clerkUrl.searchParams.has(t4.QueryParameters.DevBrowser)) return u2(r10, nk.DevBrowserSync, "");
          let n11 = r10.isSatellite && "document" === r10.secFetchDest;
          if ("production" === r10.instanceType && n11) return u2(r10, nk.SatelliteCookieNeedsSyncing, "");
          if ("development" === r10.instanceType && n11 && !r10.clerkUrl.searchParams.has(t4.QueryParameters.ClerkSynced)) {
            let e12 = new URL(r10.signInUrl);
            e12.searchParams.append(t4.QueryParameters.ClerkRedirectUrl, r10.clerkUrl.toString());
            let t12 = new Headers({ [t4.Headers.Location]: e12.toString() });
            return u2(r10, nk.SatelliteCookieNeedsSyncing, "", t12);
          }
          let s11 = new URL(r10.clerkUrl).searchParams.get(t4.QueryParameters.ClerkRedirectUrl);
          if ("development" === r10.instanceType && !r10.isSatellite && s11) {
            let e12 = new URL(s11);
            r10.devBrowserToken && e12.searchParams.append(t4.QueryParameters.DevBrowser, r10.devBrowserToken), e12.searchParams.append(t4.QueryParameters.ClerkSynced, "true");
            let t12 = new Headers({ [t4.Headers.Location]: e12.toString() });
            return u2(r10, nk.PrimaryRespondsToSyncing, "", t12);
          }
          if ("development" === r10.instanceType && !i11) return u2(r10, nk.DevBrowserMissing, "");
          if (!e11 && !t11) return nT({ tokenType: t8.SessionToken, authenticateContext: r10, reason: nk.SessionTokenAndUATMissing });
          if (!e11 && t11) return u2(r10, nk.SessionTokenWithoutClientUAT, "");
          if (e11 && !t11) return u2(r10, nk.ClientUATWithoutSessionToken, "");
          let { data: l3, errors: c3 } = tD(r10.sessionTokenInCookie);
          if (c3) return p2(c3[0], "cookie");
          if (l3.payload.iat < r10.clientUat) return u2(r10, nk.SessionTokenIATBeforeClientUAT, "");
          try {
            let { data: e12, errors: t12 } = await nH(r10.sessionTokenInCookie, r10);
            if (t12) throw t12[0];
            let i12 = nS({ tokenType: t8.SessionToken, authenticateContext: r10, sessionClaims: e12, headers: new Headers(), token: r10.sessionTokenInCookie });
            if (!r10.isSatellite && "document" === r10.secFetchDest && r10.isCrossOriginReferrer() && !r10.isKnownClerkReferrer()) return u2(r10, nk.PrimaryDomainCrossOriginSync, "Cross-origin request from satellite domain requires handshake");
            let n12 = i12.toAuth();
            if (n12.userId) {
              let e13 = function(e14, t13) {
                let r11 = a10.findTarget(e14.clerkUrl);
                if (!r11) return null;
                let i13 = false;
                if ("organization" === r11.type && (r11.organizationSlug && r11.organizationSlug !== t13.orgSlug && (i13 = true), r11.organizationId && r11.organizationId !== t13.orgId && (i13 = true)), "personalAccount" === r11.type && t13.orgId && (i13 = true), !i13) return null;
                if (e14.handshakeRedirectLoopCounter >= 3) return console.warn("Clerk: Organization activation handshake loop detected. This is likely due to an invalid organization ID or slug. Skipping organization activation."), null;
                let n13 = u2(e14, nk.ActiveOrganizationMismatch, "");
                return "handshake" !== n13.status ? null : n13;
              }(r10, n12);
              if (e13) return e13;
            }
            return i12;
          } catch (e12) {
            return p2(e12, "cookie");
          }
        }
        async function p2(t11, i11) {
          let n11;
          if (!(t11 instanceof tk)) return nT({ tokenType: t8.SessionToken, authenticateContext: r10, reason: nk.UnexpectedError });
          if (t11.reason === tv.TokenExpired && r10.refreshTokenInCookie && "GET" === e10.method) {
            let { data: e11, error: t12 } = await c2(r10);
            if (e11) return nS({ tokenType: t8.SessionToken, authenticateContext: r10, sessionClaims: e11.jwtPayload, headers: e11.headers, token: e11.sessionToken });
            n11 = t12?.cause?.reason ? t12.cause.reason : nX.UnexpectedSDKError;
          } else n11 = "GET" !== e10.method ? nX.NonEligibleNonGet : r10.refreshTokenInCookie ? null : nX.NonEligibleNoCookie;
          return (t11.tokenCarrier = i11, [tv.TokenExpired, tv.TokenNotActiveYet, tv.TokenIatInTheFuture].includes(t11.reason)) ? u2(r10, n0({ tokenError: t11.reason, refreshError: n11 }), t11.getFullMessage()) : nT({ tokenType: t8.SessionToken, authenticateContext: r10, reason: t11.reason, message: t11.getFullMessage() });
        }
        function f2(e11, t11) {
          return t11 instanceof tT ? nT({ tokenType: e11, authenticateContext: r10, reason: t11.code, message: t11.getFullMessage() }) : nT({ tokenType: e11, authenticateContext: r10, reason: nk.UnexpectedError });
        }
        async function m2() {
          let { tokenInHeader: e11 } = r10;
          if (!e11) return p2(Error("Missing token in header"), "header");
          if (!np(e11)) return nT({ tokenType: i10, authenticateContext: r10, reason: nk.TokenTypeMismatch, message: "" });
          let t11 = nQ(nf(e11), i10, r10);
          if (t11) return t11;
          let { data: n11, tokenType: s11, errors: a11 } = await n$(e11, r10);
          return a11 ? f2(s11, a11[0]) : nS({ tokenType: s11, authenticateContext: r10, machineData: n11, token: e11 });
        }
        async function g2() {
          let { tokenInHeader: e11 } = r10;
          if (!e11) return p2(Error("Missing token in header"), "header");
          if (np(e11)) {
            let t12 = nQ(nf(e11), i10, r10);
            if (t12) return t12;
            let { data: n12, tokenType: s11, errors: a11 } = await n$(e11, r10);
            return a11 ? f2(s11, a11[0]) : nS({ tokenType: s11, authenticateContext: r10, machineData: n12, token: e11 });
          }
          let { data: t11, errors: n11 } = await nH(e11, r10);
          return n11 ? p2(n11[0], "header") : nS({ tokenType: t8.SessionToken, authenticateContext: r10, sessionClaims: t11, token: e11 });
        }
        return Array.isArray(i10) && !function(e11, t11) {
          let r11 = null, { tokenInHeader: i11 } = t11;
          return i11 && (r11 = np(i11) ? nf(i11) : t8.SessionToken), nm(r11 ?? t8.SessionToken, e11);
        }(i10, r10) ? function() {
          let e11 = nb();
          return nE({ status: nw.SignedOut, reason: nk.TokenTypeMismatch, message: "", proxyUrl: "", publishableKey: "", isSatellite: false, domain: "", signInUrl: "", signUpUrl: "", afterSignInUrl: "", afterSignUpUrl: "", isSignedIn: false, isAuthenticated: false, tokenType: null, toAuth: () => e11, headers: new Headers(), token: null });
        }() : r10.tokenInHeader ? "any" === i10 ? g2() : i10 === t8.SessionToken ? d2() : m2() : i10 === t8.OAuthToken || i10 === t8.ApiKey || i10 === t8.M2MToken ? nT({ tokenType: i10, authenticateContext: r10, reason: "No token in header" }) : h2();
      }, nZ = (e10) => {
        let { isSignedIn: t10, isAuthenticated: r10, proxyUrl: i10, reason: n10, message: s10, publishableKey: a10, isSatellite: o2, domain: l2 } = e10;
        return { isSignedIn: t10, isAuthenticated: r10, proxyUrl: i10, reason: n10, message: s10, publishableKey: a10, isSatellite: o2, domain: l2 };
      }, n0 = ({ tokenError: e10, refreshError: t10 }) => {
        switch (e10) {
          case tv.TokenExpired:
            return `${nk.SessionTokenExpired}-refresh-${t10}`;
          case tv.TokenNotActiveYet:
            return nk.SessionTokenNBF;
          case tv.TokenIatInTheFuture:
            return nk.SessionTokenIatInTheFuture;
          default:
            return nk.UnexpectedError;
        }
      }, n1 = { secretKey: "", machineSecretKey: "", jwtKey: "", apiUrl: void 0, apiVersion: void 0, proxyUrl: "", publishableKey: "", isSatellite: false, domain: "", audience: "" };
      e.s(["ReadonlyURLSearchParams", () => n3, "unstable_isUnrecognizedActionError", () => n6], 55493), e.i(16852), e.i(75982), e.r(91375).actionAsyncStorage;
      var n2 = e.i(68585);
      let n4 = "" + n2.HTTP_ERROR_FALLBACK_ERROR_CODE + ";404";
      n2.HTTP_ERROR_FALLBACK_ERROR_CODE, n2.HTTP_ERROR_FALLBACK_ERROR_CODE, e.r(82748).unstable_rethrow;
      class n5 extends Error {
        constructor() {
          super("Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams");
        }
      }
      class n3 extends URLSearchParams {
        append() {
          throw new n5();
        }
        delete() {
          throw new n5();
        }
        set() {
          throw new n5();
        }
        sort() {
          throw new n5();
        }
      }
      function n6() {
        throw Object.defineProperty(Error("`unstable_isUnrecognizedActionError` can only be used on the client."), "__NEXT_ERROR_CODE", { value: "E776", enumerable: false, configurable: true });
      }
      e.i(55493), e.s([], 85835), e.i(64445), "undefined" == typeof URLPattern || URLPattern, e.i(63072), e.i(80082), e.i(51564), e.i(65179), e.i(92999), e.i(51247);
      let { env: n9, stdout: n8 } = (null == (sV = globalThis) ? void 0 : sV.process) ?? {}, n7 = n9 && !n9.NO_COLOR && (n9.FORCE_COLOR || (null == n8 ? void 0 : n8.isTTY) && !n9.CI && "dumb" !== n9.TERM), se = (e10, t10, r10, i10) => {
        let n10 = e10.substring(0, i10) + r10, s10 = e10.substring(i10 + t10.length), a10 = s10.indexOf(t10);
        return ~a10 ? n10 + se(s10, t10, r10, a10) : n10 + s10;
      }, st = (e10, t10, r10 = e10) => n7 ? (i10) => {
        let n10 = "" + i10, s10 = n10.indexOf(t10, e10.length);
        return ~s10 ? e10 + se(n10, t10, r10, s10) + t10 : e10 + n10 + t10;
      } : String, sr = st("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m");
      st("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"), st("\x1B[3m", "\x1B[23m"), st("\x1B[4m", "\x1B[24m"), st("\x1B[7m", "\x1B[27m"), st("\x1B[8m", "\x1B[28m"), st("\x1B[9m", "\x1B[29m"), st("\x1B[30m", "\x1B[39m");
      let si = st("\x1B[31m", "\x1B[39m"), sn = st("\x1B[32m", "\x1B[39m"), ss = st("\x1B[33m", "\x1B[39m");
      st("\x1B[34m", "\x1B[39m");
      let sa = st("\x1B[35m", "\x1B[39m");
      st("\x1B[38;2;173;127;168m", "\x1B[39m"), st("\x1B[36m", "\x1B[39m");
      let so = st("\x1B[37m", "\x1B[39m");
      st("\x1B[90m", "\x1B[39m"), st("\x1B[40m", "\x1B[49m"), st("\x1B[41m", "\x1B[49m"), st("\x1B[42m", "\x1B[49m"), st("\x1B[43m", "\x1B[49m"), st("\x1B[44m", "\x1B[49m"), st("\x1B[45m", "\x1B[49m"), st("\x1B[46m", "\x1B[49m"), st("\x1B[47m", "\x1B[49m"), so(sr("\u25CB")), si(sr("\u2A2F")), ss(sr("\u26A0")), so(sr(" ")), sn(sr("\u2713")), sa(sr("\xBB")), new eR(1e4, (e10) => e10.length), /* @__PURE__ */ new WeakMap(), e.i(85835);
      let sl = { Headers: { NextRewrite: "x-middleware-rewrite", NextResume: "x-middleware-next", NextRedirect: "Location", NextUrl: "next-url", NextAction: "next-action", NextjsData: "x-nextjs-data" } }, sc = (e10, t10, r10) => (e10.headers.set(t10, r10), e10);
      var su = "__clerk_db_jwt", sd = e.i(347);
      let sh = (e10) => {
        if (!e10 || "string" != typeof e10) return e10;
        try {
          return (e10 || "").replace(/^(sk_(live|test)_)(.+?)(.{3})$/, "$1*********$4");
        } catch {
          return "";
        }
      }, sp = (e10) => (Array.isArray(e10) ? e10 : [e10]).map((e11) => "string" == typeof e11 ? sh(e11) : JSON.stringify(Object.fromEntries(Object.entries(e11).map(([e12, t10]) => [e12, sh(t10)])), null, 2)).join(", ");
      function sf(e10, t10, r10) {
        return "function" == typeof e10 ? e10(t10) : void 0 !== e10 ? e10 : void 0 !== r10 ? r10 : void 0;
      }
      var sm = (e10) => {
        let t10 = (r10) => {
          if (!r10) return r10;
          if (Array.isArray(r10)) return r10.map((e11) => "object" == typeof e11 || Array.isArray(e11) ? t10(e11) : e11);
          let i10 = { ...r10 };
          for (let r11 of Object.keys(i10)) {
            let n10 = e10(r11.toString());
            n10 !== r11 && (i10[n10] = i10[r11], delete i10[r11]), "object" == typeof i10[n10] && (i10[n10] = t10(i10[n10]));
          }
          return i10;
        };
        return t10;
      };
      function sg(e10) {
        if ("boolean" == typeof e10) return e10;
        if (null == e10) return false;
        if ("string" == typeof e10) {
          if ("true" === e10.toLowerCase()) return true;
          if ("false" === e10.toLowerCase()) return false;
        }
        let t10 = parseInt(e10, 10);
        return !isNaN(t10) && t10 > 0;
      }
      sm(function(e10) {
        return e10 ? e10.replace(/[A-Z]/g, (e11) => `_${e11.toLowerCase()}`) : "";
      }), sm(function(e10) {
        return e10 ? e10.replace(/([-_][a-z])/g, (e11) => e11.toUpperCase().replace(/-|_/, "")) : "";
      }), process.env.NEXT_PUBLIC_CLERK_JS_VERSION, process.env.NEXT_PUBLIC_CLERK_JS_URL;
      let sy = process.env.CLERK_API_VERSION || "v1", s_ = process.env.CLERK_SECRET_KEY || "", sb = process.env.CLERK_MACHINE_SECRET_KEY || "", sv = "pk_test_d2FybS1maW5jaC01MS5jbGVyay5hY2NvdW50cy5kZXYk", sw = process.env.CLERK_ENCRYPTION_KEY || "", sk = process.env.CLERK_API_URL || ((e10) => {
        let t10 = to(e10)?.frontendApi;
        return t10?.startsWith("clerk.") && eY.some((e11) => t10?.endsWith(e11)) ? e4 : e1.some((e11) => t10?.endsWith(e11)) ? "https://api.lclclerk.com" : e2.some((e11) => t10?.endsWith(e11)) ? "https://api.clerkstage.dev" : e4;
      })(sv), sS = process.env.NEXT_PUBLIC_CLERK_DOMAIN || "", sT = process.env.NEXT_PUBLIC_CLERK_PROXY_URL || "", sE = sg(process.env.NEXT_PUBLIC_CLERK_IS_SATELLITE) || false, sx = "/sign-in", sO = sg(process.env.NEXT_PUBLIC_CLERK_TELEMETRY_DISABLED), sC = sg(process.env.NEXT_PUBLIC_CLERK_TELEMETRY_DEBUG), sR = sg(process.env.NEXT_PUBLIC_CLERK_KEYLESS_DISABLED) || false, sI = !(sd.default.version.startsWith("13.") || sd.default.version.startsWith("14.0")) && false, sP = (e10) => {
        if (!(e10 instanceof Error) || !("message" in e10)) return false;
        let { message: t10 } = e10, r10 = t10.toLowerCase(), i10 = r10.includes("dynamic server usage"), n10 = r10.includes("this page needs to bail out of prerendering");
        return /Route .*? needs to bail out of prerendering at this point because it used .*?./.test(t10) || i10 || n10;
      };
      async function sA() {
        try {
          let { headers: t10 } = await Promise.resolve().then(() => e.i(40415)), r10 = await t10();
          return new M("https://placeholder.com", { headers: r10 });
        } catch (e10) {
          if (e10 && sP(e10)) throw e10;
          throw Error(`Clerk: auth(), currentUser() and clerkClient(), are only supported in App Router (/app directory).
If you're using /pages, try getAuth() instead.
Original error: ${e10}`);
        }
      }
      var sN = class {
        constructor() {
          e9(this, sQ), e9(this, sG, "clerk_telemetry_throttler"), e9(this, sX, 864e5);
        }
        isEventThrottled(e10) {
          if (!e6(this, sQ, s0)) return false;
          let t10 = Date.now(), r10 = e7(this, sQ, sY).call(this, e10), i10 = e6(this, sQ, sZ)?.[r10];
          if (!i10) {
            let e11 = { ...e6(this, sQ, sZ), [r10]: t10 };
            localStorage.setItem(e6(this, sG), JSON.stringify(e11));
          }
          if (i10 && t10 - i10 > e6(this, sX)) {
            let e11 = e6(this, sQ, sZ);
            delete e11[r10], localStorage.setItem(e6(this, sG), JSON.stringify(e11));
          }
          return !!i10;
        }
      };
      sG = /* @__PURE__ */ new WeakMap(), sX = /* @__PURE__ */ new WeakMap(), sQ = /* @__PURE__ */ new WeakSet(), sY = function(e10) {
        let { sk: t10, pk: r10, payload: i10, ...n10 } = e10, s10 = { ...i10, ...n10 };
        return JSON.stringify(Object.keys({ ...i10, ...n10 }).sort().map((e11) => s10[e11]));
      }, sZ = function() {
        let e10 = localStorage.getItem(e6(this, sG));
        return e10 ? JSON.parse(e10) : {};
      }, s0 = function() {
        return false;
      };
      var sU = /* @__PURE__ */ new Set(["error", "warn", "info", "debug", "trace"]), sM = { samplingRate: 1, maxBufferSize: 5, endpoint: "https://clerk-telemetry.com" }, sL = class {
        constructor(e10) {
          e9(this, s6), e9(this, s1), e9(this, s2), e9(this, s4, {}), e9(this, s5, []), e9(this, s3, null), e8(this, s1, { maxBufferSize: e10.maxBufferSize ?? sM.maxBufferSize, samplingRate: e10.samplingRate ?? sM.samplingRate, perEventSampling: e10.perEventSampling ?? true, disabled: e10.disabled ?? false, debug: e10.debug ?? false, endpoint: sM.endpoint }), e10.clerkVersion ? e6(this, s4).clerkVersion = e10.clerkVersion ?? "" : e6(this, s4).clerkVersion = "", e6(this, s4).sdk = e10.sdk, e6(this, s4).sdkVersion = e10.sdkVersion, e6(this, s4).publishableKey = e10.publishableKey ?? "";
          let t10 = to(e10.publishableKey);
          t10 && (e6(this, s4).instanceType = t10.instanceType), e10.secretKey && (e6(this, s4).secretKey = e10.secretKey.substring(0, 16)), e8(this, s2, new sN());
        }
        get isEnabled() {
          return !("development" !== e6(this, s4).instanceType || e6(this, s1).disabled || "undefined" != typeof process && process.env && sg(process.env.CLERK_TELEMETRY_DISABLED));
        }
        get isDebug() {
          return e6(this, s1).debug || "undefined" != typeof process && process.env && sg(process.env.CLERK_TELEMETRY_DEBUG);
        }
        record(e10) {
          try {
            let t10 = e7(this, s6, an).call(this, e10.event, e10.payload);
            if (e7(this, s6, ar).call(this, t10.event, t10), !e7(this, s6, s9).call(this, t10, e10.eventSamplingRate)) return;
            e6(this, s5).push({ kind: "event", value: t10 }), e7(this, s6, ae).call(this);
          } catch (e11) {
            console.error("[clerk/telemetry] Error recording telemetry event", e11);
          }
        }
        recordLog(e10) {
          try {
            if (!e7(this, s6, s8).call(this, e10)) return;
            let t10 = "string" == typeof e10?.level && sU.has(e10.level), r10 = "string" == typeof e10?.message && e10.message.trim().length > 0, i10 = null, n10 = e10?.timestamp;
            if ("number" == typeof n10 || "string" == typeof n10) {
              let e11 = new Date(n10);
              Number.isNaN(e11.getTime()) || (i10 = e11);
            }
            if (!t10 || !r10 || null === i10) {
              this.isDebug && "undefined" != typeof console && console.warn("[clerk/telemetry] Dropping invalid telemetry log entry", { levelIsValid: t10, messageIsValid: r10, timestampIsValid: null !== i10 });
              return;
            }
            let s10 = e7(this, s6, ai).call(this), a10 = { sdk: s10.name, sdkv: s10.version, cv: e6(this, s4).clerkVersion ?? "", lvl: e10.level, msg: e10.message, ts: i10.toISOString(), pk: e6(this, s4).publishableKey || null, payload: e7(this, s6, as).call(this, e10.context) };
            e6(this, s5).push({ kind: "log", value: a10 }), e7(this, s6, ae).call(this);
          } catch (e11) {
            console.error("[clerk/telemetry] Error recording telemetry log entry", e11);
          }
        }
      };
      s1 = /* @__PURE__ */ new WeakMap(), s2 = /* @__PURE__ */ new WeakMap(), s4 = /* @__PURE__ */ new WeakMap(), s5 = /* @__PURE__ */ new WeakMap(), s3 = /* @__PURE__ */ new WeakMap(), s6 = /* @__PURE__ */ new WeakSet(), s9 = function(e10, t10) {
        return this.isEnabled && !this.isDebug && e7(this, s6, s7).call(this, e10, t10);
      }, s8 = function(e10) {
        return true;
      }, s7 = function(e10, t10) {
        let r10 = Math.random();
        return !!(r10 <= e6(this, s1).samplingRate && (false === e6(this, s1).perEventSampling || void 0 === t10 || r10 <= t10)) && !e6(this, s2).isEventThrottled(e10);
      }, ae = function() {
        e7(this, s6, at).call(this);
      }, at = function() {
        let e10 = [...e6(this, s5)];
        if (e8(this, s5, []), e8(this, s3, null), 0 === e10.length) return;
        let t10 = e10.filter((e11) => "event" === e11.kind).map((e11) => e11.value), r10 = e10.filter((e11) => "log" === e11.kind).map((e11) => e11.value);
        t10.length > 0 && fetch(new URL("/v1/event", e6(this, s1).endpoint), { headers: { "Content-Type": "application/json" }, keepalive: true, method: "POST", body: JSON.stringify({ events: t10 }) }).catch(() => void 0), r10.length > 0 && fetch(new URL("/v1/logs", e6(this, s1).endpoint), { headers: { "Content-Type": "application/json" }, keepalive: true, method: "POST", body: JSON.stringify({ logs: r10 }) }).catch(() => void 0);
      }, ar = function(e10, t10) {
        this.isDebug && (void 0 !== console.groupCollapsed ? (console.groupCollapsed("[clerk/telemetry]", e10), console.log(t10), console.groupEnd()) : console.log("[clerk/telemetry]", e10, t10));
      }, ai = function() {
        return { name: e6(this, s4).sdk, version: e6(this, s4).sdkVersion };
      }, an = function(e10, t10) {
        let r10 = e7(this, s6, ai).call(this);
        return { event: e10, cv: e6(this, s4).clerkVersion ?? "", it: e6(this, s4).instanceType ?? "", sdk: r10.name, sdkv: r10.version, ...e6(this, s4).publishableKey ? { pk: e6(this, s4).publishableKey } : {}, ...e6(this, s4).secretKey ? { sk: e6(this, s4).secretKey } : {}, payload: t10 };
      }, as = function(e10) {
        if (null == e10 || "object" != typeof e10) return null;
        try {
          let t10 = JSON.parse(JSON.stringify(e10));
          if (t10 && "object" == typeof t10 && !Array.isArray(t10)) return t10;
          return null;
        } catch {
          return null;
        }
      }, async (...e10) => {
        let { data: t10, errors: r10 } = await nH(...e10);
        if (r10) throw r10[0];
        return t10;
      };
      let sD = { secretKey: s_, publishableKey: sv, apiUrl: sk, apiVersion: sy, userAgent: "@clerk/nextjs@6.31.8", proxyUrl: sT, domain: sS, isSatellite: sE, machineSecretKey: sb, sdkMetadata: { name: "@clerk/nextjs", version: "6.31.8", environment: "production" }, telemetry: { disabled: sO, debug: sC } }, sq = (e10) => function(e11) {
        let t10 = { ...e11 }, r10 = nu(t10), i10 = function(e12) {
          let t11 = t6(n1, e12.options), r11 = e12.apiClient;
          return { authenticateRequest: (e13, i11 = {}) => {
            let { apiUrl: n11, apiVersion: s10 } = t11, a10 = t6(t11, i11);
            return nY(e13, { ...i11, ...a10, apiUrl: n11, apiVersion: s10, apiClient: r11 });
          }, debugRequestState: nZ };
        }({ options: t10, apiClient: r10 }), n10 = new sL({ publishableKey: t10.publishableKey, secretKey: t10.secretKey, samplingRate: 0.1, ...t10.sdkMetadata ? { sdk: t10.sdkMetadata.name, sdkVersion: t10.sdkMetadata.version } : {}, ...t10.telemetry || {} });
        return { ...r10, ...i10, telemetry: n10 };
      }({ ...sD, ...e10 });
      function sj(e10, t10) {
        var r10, i10;
        return function(e11) {
          try {
            let { headers: t11, nextUrl: r11, cookies: i11 } = e11 || {};
            return "function" == typeof (null == t11 ? void 0 : t11.get) && "function" == typeof (null == r11 ? void 0 : r11.searchParams.get) && "function" == typeof (null == i11 ? void 0 : i11.get);
          } catch {
            return false;
          }
        }(e10) || function(e11) {
          try {
            let { headers: t11 } = e11 || {};
            return "function" == typeof (null == t11 ? void 0 : t11.get);
          } catch {
            return false;
          }
        }(e10) ? e10.headers.get(t10) : e10.headers[t10] || e10.headers[t10.toLowerCase()] || (null == (i10 = null == (r10 = e10.socket) ? void 0 : r10._httpMessage) ? void 0 : i10.getHeader(t10));
      }
      var sH = e.i(78500);
      let sB = /* @__PURE__ */ new Map(), sz = new sH.AsyncLocalStorage();
      var sK = /* @__PURE__ */ new Set(), sJ = { warnOnce: (e10) => {
        sK.has(e10) || (sK.add(e10), console.warn(e10));
      } };
      function s$(e10) {
        return /^http(s)?:\/\//.test(e10 || "");
      }
      var sF, sW, sV, sG, sX, sQ, sY, sZ, s0, s1, s2, s4, s5, s3, s6, s9, s8, s7, ae, at, ar, ai, an, as, aa, ao, al, ac, au, ad, ah = Object.defineProperty, ap = (null == (aa = "undefined" != typeof globalThis ? globalThis : void 0) ? void 0 : aa.crypto) || (null == (ao = e.g) ? void 0 : ao.crypto) || (null == (al = "undefined" != typeof self ? self : void 0) ? void 0 : al.crypto) || (null == (au = null == (ac = "undefined" != typeof frames ? frames : void 0) ? void 0 : ac[0]) ? void 0 : au.crypto);
      ad = ap ? (e10) => {
        let t10 = [];
        for (let r10 = 0; r10 < e10; r10 += 4) t10.push(ap.getRandomValues(new Uint32Array(1))[0]);
        return new am(t10, e10);
      } : (e10) => {
        let t10 = [], r10 = (e11) => {
          let t11 = e11, r11 = 987654321;
          return () => {
            let e12 = ((r11 = 36969 * (65535 & r11) + (r11 >> 16) | 0) << 16) + (t11 = 18e3 * (65535 & t11) + (t11 >> 16) | 0) | 0;
            return e12 /= 4294967296, (e12 += 0.5) * (Math.random() > 0.5 ? 1 : -1);
          };
        };
        for (let i10 = 0, n10; i10 < e10; i10 += 4) {
          let e11 = r10(4294967296 * (n10 || Math.random()));
          n10 = 987654071 * e11(), t10.push(4294967296 * e11() | 0);
        }
        return new am(t10, e10);
      };
      var af = class {
        static create(...e10) {
          return new this(...e10);
        }
        mixIn(e10) {
          return Object.assign(this, e10);
        }
        clone() {
          let e10 = new this.constructor();
          return Object.assign(e10, this), e10;
        }
      }, am = class extends af {
        constructor(e10 = [], t10 = 4 * e10.length) {
          super();
          let r10 = e10;
          if (r10 instanceof ArrayBuffer && (r10 = new Uint8Array(r10)), (r10 instanceof Int8Array || r10 instanceof Uint8ClampedArray || r10 instanceof Int16Array || r10 instanceof Uint16Array || r10 instanceof Int32Array || r10 instanceof Uint32Array || r10 instanceof Float32Array || r10 instanceof Float64Array) && (r10 = new Uint8Array(r10.buffer, r10.byteOffset, r10.byteLength)), r10 instanceof Uint8Array) {
            let e11 = r10.byteLength, t11 = [];
            for (let i10 = 0; i10 < e11; i10 += 1) t11[i10 >>> 2] |= r10[i10] << 24 - i10 % 4 * 8;
            this.words = t11, this.sigBytes = e11;
          } else this.words = e10, this.sigBytes = t10;
        }
        toString(e10 = ag) {
          return e10.stringify(this);
        }
        concat(e10) {
          let t10 = this.words, r10 = e10.words, i10 = this.sigBytes, n10 = e10.sigBytes;
          if (this.clamp(), i10 % 4) for (let e11 = 0; e11 < n10; e11 += 1) {
            let n11 = r10[e11 >>> 2] >>> 24 - e11 % 4 * 8 & 255;
            t10[i10 + e11 >>> 2] |= n11 << 24 - (i10 + e11) % 4 * 8;
          }
          else for (let e11 = 0; e11 < n10; e11 += 4) t10[i10 + e11 >>> 2] = r10[e11 >>> 2];
          return this.sigBytes += n10, this;
        }
        clamp() {
          let { words: e10, sigBytes: t10 } = this;
          e10[t10 >>> 2] &= 4294967295 << 32 - t10 % 4 * 8, e10.length = Math.ceil(t10 / 4);
        }
        clone() {
          let e10 = super.clone.call(this);
          return e10.words = this.words.slice(0), e10;
        }
      };
      ((e10, t10, r10) => ((e11, t11, r11) => t11 in e11 ? ah(e11, t11, { enumerable: true, configurable: true, writable: true, value: r11 }) : e11[t11] = r11)(e10, "symbol" != typeof t10 ? t10 + "" : t10, r10))(am, "random", ad);
      var ag = { stringify(e10) {
        let { words: t10, sigBytes: r10 } = e10, i10 = [];
        for (let e11 = 0; e11 < r10; e11 += 1) {
          let r11 = t10[e11 >>> 2] >>> 24 - e11 % 4 * 8 & 255;
          i10.push((r11 >>> 4).toString(16)), i10.push((15 & r11).toString(16));
        }
        return i10.join("");
      }, parse(e10) {
        let t10 = e10.length, r10 = [];
        for (let i10 = 0; i10 < t10; i10 += 2) r10[i10 >>> 3] |= parseInt(e10.substr(i10, 2), 16) << 24 - i10 % 8 * 4;
        return new am(r10, t10 / 2);
      } }, ay = { stringify(e10) {
        let { words: t10, sigBytes: r10 } = e10, i10 = [];
        for (let e11 = 0; e11 < r10; e11 += 1) {
          let r11 = t10[e11 >>> 2] >>> 24 - e11 % 4 * 8 & 255;
          i10.push(String.fromCharCode(r11));
        }
        return i10.join("");
      }, parse(e10) {
        let t10 = e10.length, r10 = [];
        for (let i10 = 0; i10 < t10; i10 += 1) r10[i10 >>> 2] |= (255 & e10.charCodeAt(i10)) << 24 - i10 % 4 * 8;
        return new am(r10, t10);
      } }, a_ = { stringify(e10) {
        try {
          return decodeURIComponent(escape(ay.stringify(e10)));
        } catch {
          throw Error("Malformed UTF-8 data");
        }
      }, parse: (e10) => ay.parse(unescape(encodeURIComponent(e10))) }, ab = class extends af {
        constructor() {
          super(), this._minBufferSize = 0;
        }
        reset() {
          this._data = new am(), this._nDataBytes = 0;
        }
        _append(e10) {
          let t10 = e10;
          "string" == typeof t10 && (t10 = a_.parse(t10)), this._data.concat(t10), this._nDataBytes += t10.sigBytes;
        }
        _process(e10) {
          let t10, { _data: r10, blockSize: i10 } = this, n10 = r10.words, s10 = r10.sigBytes, a10 = s10 / (4 * i10), o2 = (a10 = e10 ? Math.ceil(a10) : Math.max((0 | a10) - this._minBufferSize, 0)) * i10, l2 = Math.min(4 * o2, s10);
          if (o2) {
            for (let e11 = 0; e11 < o2; e11 += i10) this._doProcessBlock(n10, e11);
            t10 = n10.splice(0, o2), r10.sigBytes -= l2;
          }
          return new am(t10, l2);
        }
        clone() {
          let e10 = super.clone.call(this);
          return e10._data = this._data.clone(), e10;
        }
      }, av = class extends ab {
        constructor(e10) {
          super(), this.blockSize = 16, this.cfg = Object.assign(new af(), e10), this.reset();
        }
        static _createHelper(e10) {
          return (t10, r10) => new e10(r10).finalize(t10);
        }
        static _createHmacHelper(e10) {
          return (t10, r10) => new aw(e10, r10).finalize(t10);
        }
        reset() {
          super.reset.call(this), this._doReset();
        }
        update(e10) {
          return this._append(e10), this._process(), this;
        }
        finalize(e10) {
          return e10 && this._append(e10), this._doFinalize();
        }
      }, aw = class extends af {
        constructor(e10, t10) {
          super();
          let r10 = new e10();
          this._hasher = r10;
          let i10 = t10;
          "string" == typeof i10 && (i10 = a_.parse(i10));
          let n10 = r10.blockSize, s10 = 4 * n10;
          i10.sigBytes > s10 && (i10 = r10.finalize(t10)), i10.clamp();
          let a10 = i10.clone();
          this._oKey = a10;
          let o2 = i10.clone();
          this._iKey = o2;
          let l2 = a10.words, c2 = o2.words;
          for (let e11 = 0; e11 < n10; e11 += 1) l2[e11] ^= 1549556828, c2[e11] ^= 909522486;
          a10.sigBytes = s10, o2.sigBytes = s10, this.reset();
        }
        reset() {
          let e10 = this._hasher;
          e10.reset(), e10.update(this._iKey);
        }
        update(e10) {
          return this._hasher.update(e10), this;
        }
        finalize(e10) {
          let t10 = this._hasher, r10 = t10.finalize(e10);
          return t10.reset(), t10.finalize(this._oKey.clone().concat(r10));
        }
      }, ak = { stringify(e10) {
        let { words: t10, sigBytes: r10 } = e10, i10 = this._map;
        e10.clamp();
        let n10 = [];
        for (let e11 = 0; e11 < r10; e11 += 3) {
          let s11 = (t10[e11 >>> 2] >>> 24 - e11 % 4 * 8 & 255) << 16 | (t10[e11 + 1 >>> 2] >>> 24 - (e11 + 1) % 4 * 8 & 255) << 8 | t10[e11 + 2 >>> 2] >>> 24 - (e11 + 2) % 4 * 8 & 255;
          for (let t11 = 0; t11 < 4 && e11 + 0.75 * t11 < r10; t11 += 1) n10.push(i10.charAt(s11 >>> 6 * (3 - t11) & 63));
        }
        let s10 = i10.charAt(64);
        if (s10) for (; n10.length % 4; ) n10.push(s10);
        return n10.join("");
      }, parse(e10) {
        let t10 = e10.length, r10 = this._map, i10 = this._reverseMap;
        if (!i10) {
          this._reverseMap = [], i10 = this._reverseMap;
          for (let e11 = 0; e11 < r10.length; e11 += 1) i10[r10.charCodeAt(e11)] = e11;
        }
        let n10 = r10.charAt(64);
        if (n10) {
          let r11 = e10.indexOf(n10);
          -1 !== r11 && (t10 = r11);
        }
        var s10 = t10, a10 = i10;
        let o2 = [], l2 = 0;
        for (let t11 = 0; t11 < s10; t11 += 1) if (t11 % 4) {
          let r11 = a10[e10.charCodeAt(t11 - 1)] << t11 % 4 * 2 | a10[e10.charCodeAt(t11)] >>> 6 - t11 % 4 * 2;
          o2[l2 >>> 2] |= r11 << 24 - l2 % 4 * 8, l2 += 1;
        }
        return am.create(o2, l2);
      }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" }, aS = [];
      for (let e10 = 0; e10 < 64; e10 += 1) aS[e10] = 4294967296 * Math.abs(Math.sin(e10 + 1)) | 0;
      var aT = (e10, t10, r10, i10, n10, s10, a10) => {
        let o2 = e10 + (t10 & r10 | ~t10 & i10) + n10 + a10;
        return (o2 << s10 | o2 >>> 32 - s10) + t10;
      }, aE = (e10, t10, r10, i10, n10, s10, a10) => {
        let o2 = e10 + (t10 & i10 | r10 & ~i10) + n10 + a10;
        return (o2 << s10 | o2 >>> 32 - s10) + t10;
      }, ax = (e10, t10, r10, i10, n10, s10, a10) => {
        let o2 = e10 + (t10 ^ r10 ^ i10) + n10 + a10;
        return (o2 << s10 | o2 >>> 32 - s10) + t10;
      }, aO = (e10, t10, r10, i10, n10, s10, a10) => {
        let o2 = e10 + (r10 ^ (t10 | ~i10)) + n10 + a10;
        return (o2 << s10 | o2 >>> 32 - s10) + t10;
      }, aC = class extends av {
        _doReset() {
          this._hash = new am([1732584193, 4023233417, 2562383102, 271733878]);
        }
        _doProcessBlock(e10, t10) {
          for (let r11 = 0; r11 < 16; r11 += 1) {
            let i11 = t10 + r11, n11 = e10[i11];
            e10[i11] = (n11 << 8 | n11 >>> 24) & 16711935 | (n11 << 24 | n11 >>> 8) & 4278255360;
          }
          let r10 = this._hash.words, i10 = e10[t10 + 0], n10 = e10[t10 + 1], s10 = e10[t10 + 2], a10 = e10[t10 + 3], o2 = e10[t10 + 4], l2 = e10[t10 + 5], c2 = e10[t10 + 6], u2 = e10[t10 + 7], d2 = e10[t10 + 8], h2 = e10[t10 + 9], p2 = e10[t10 + 10], f2 = e10[t10 + 11], m2 = e10[t10 + 12], g2 = e10[t10 + 13], y2 = e10[t10 + 14], _2 = e10[t10 + 15], b2 = r10[0], v2 = r10[1], w2 = r10[2], k2 = r10[3];
          b2 = aT(b2, v2, w2, k2, i10, 7, aS[0]), k2 = aT(k2, b2, v2, w2, n10, 12, aS[1]), w2 = aT(w2, k2, b2, v2, s10, 17, aS[2]), v2 = aT(v2, w2, k2, b2, a10, 22, aS[3]), b2 = aT(b2, v2, w2, k2, o2, 7, aS[4]), k2 = aT(k2, b2, v2, w2, l2, 12, aS[5]), w2 = aT(w2, k2, b2, v2, c2, 17, aS[6]), v2 = aT(v2, w2, k2, b2, u2, 22, aS[7]), b2 = aT(b2, v2, w2, k2, d2, 7, aS[8]), k2 = aT(k2, b2, v2, w2, h2, 12, aS[9]), w2 = aT(w2, k2, b2, v2, p2, 17, aS[10]), v2 = aT(v2, w2, k2, b2, f2, 22, aS[11]), b2 = aT(b2, v2, w2, k2, m2, 7, aS[12]), k2 = aT(k2, b2, v2, w2, g2, 12, aS[13]), w2 = aT(w2, k2, b2, v2, y2, 17, aS[14]), v2 = aT(v2, w2, k2, b2, _2, 22, aS[15]), b2 = aE(b2, v2, w2, k2, n10, 5, aS[16]), k2 = aE(k2, b2, v2, w2, c2, 9, aS[17]), w2 = aE(w2, k2, b2, v2, f2, 14, aS[18]), v2 = aE(v2, w2, k2, b2, i10, 20, aS[19]), b2 = aE(b2, v2, w2, k2, l2, 5, aS[20]), k2 = aE(k2, b2, v2, w2, p2, 9, aS[21]), w2 = aE(w2, k2, b2, v2, _2, 14, aS[22]), v2 = aE(v2, w2, k2, b2, o2, 20, aS[23]), b2 = aE(b2, v2, w2, k2, h2, 5, aS[24]), k2 = aE(k2, b2, v2, w2, y2, 9, aS[25]), w2 = aE(w2, k2, b2, v2, a10, 14, aS[26]), v2 = aE(v2, w2, k2, b2, d2, 20, aS[27]), b2 = aE(b2, v2, w2, k2, g2, 5, aS[28]), k2 = aE(k2, b2, v2, w2, s10, 9, aS[29]), w2 = aE(w2, k2, b2, v2, u2, 14, aS[30]), v2 = aE(v2, w2, k2, b2, m2, 20, aS[31]), b2 = ax(b2, v2, w2, k2, l2, 4, aS[32]), k2 = ax(k2, b2, v2, w2, d2, 11, aS[33]), w2 = ax(w2, k2, b2, v2, f2, 16, aS[34]), v2 = ax(v2, w2, k2, b2, y2, 23, aS[35]), b2 = ax(b2, v2, w2, k2, n10, 4, aS[36]), k2 = ax(k2, b2, v2, w2, o2, 11, aS[37]), w2 = ax(w2, k2, b2, v2, u2, 16, aS[38]), v2 = ax(v2, w2, k2, b2, p2, 23, aS[39]), b2 = ax(b2, v2, w2, k2, g2, 4, aS[40]), k2 = ax(k2, b2, v2, w2, i10, 11, aS[41]), w2 = ax(w2, k2, b2, v2, a10, 16, aS[42]), v2 = ax(v2, w2, k2, b2, c2, 23, aS[43]), b2 = ax(b2, v2, w2, k2, h2, 4, aS[44]), k2 = ax(k2, b2, v2, w2, m2, 11, aS[45]), w2 = ax(w2, k2, b2, v2, _2, 16, aS[46]), v2 = ax(v2, w2, k2, b2, s10, 23, aS[47]), b2 = aO(b2, v2, w2, k2, i10, 6, aS[48]), k2 = aO(k2, b2, v2, w2, u2, 10, aS[49]), w2 = aO(w2, k2, b2, v2, y2, 15, aS[50]), v2 = aO(v2, w2, k2, b2, l2, 21, aS[51]), b2 = aO(b2, v2, w2, k2, m2, 6, aS[52]), k2 = aO(k2, b2, v2, w2, a10, 10, aS[53]), w2 = aO(w2, k2, b2, v2, p2, 15, aS[54]), v2 = aO(v2, w2, k2, b2, n10, 21, aS[55]), b2 = aO(b2, v2, w2, k2, d2, 6, aS[56]), k2 = aO(k2, b2, v2, w2, _2, 10, aS[57]), w2 = aO(w2, k2, b2, v2, c2, 15, aS[58]), v2 = aO(v2, w2, k2, b2, g2, 21, aS[59]), b2 = aO(b2, v2, w2, k2, o2, 6, aS[60]), k2 = aO(k2, b2, v2, w2, f2, 10, aS[61]), w2 = aO(w2, k2, b2, v2, s10, 15, aS[62]), v2 = aO(v2, w2, k2, b2, h2, 21, aS[63]), r10[0] = r10[0] + b2 | 0, r10[1] = r10[1] + v2 | 0, r10[2] = r10[2] + w2 | 0, r10[3] = r10[3] + k2 | 0;
        }
        _doFinalize() {
          let e10 = this._data, t10 = e10.words, r10 = 8 * this._nDataBytes, i10 = 8 * e10.sigBytes;
          t10[i10 >>> 5] |= 128 << 24 - i10 % 32;
          let n10 = Math.floor(r10 / 4294967296);
          t10[(i10 + 64 >>> 9 << 4) + 15] = (n10 << 8 | n10 >>> 24) & 16711935 | (n10 << 24 | n10 >>> 8) & 4278255360, t10[(i10 + 64 >>> 9 << 4) + 14] = (r10 << 8 | r10 >>> 24) & 16711935 | (r10 << 24 | r10 >>> 8) & 4278255360, e10.sigBytes = (t10.length + 1) * 4, this._process();
          let s10 = this._hash, a10 = s10.words;
          for (let e11 = 0; e11 < 4; e11 += 1) {
            let t11 = a10[e11];
            a10[e11] = (t11 << 8 | t11 >>> 24) & 16711935 | (t11 << 24 | t11 >>> 8) & 4278255360;
          }
          return s10;
        }
        clone() {
          let e10 = super.clone.call(this);
          return e10._hash = this._hash.clone(), e10;
        }
      };
      av._createHelper(aC), av._createHmacHelper(aC);
      var aR = class extends af {
        constructor(e10) {
          super(), this.cfg = Object.assign(new af(), { keySize: 4, hasher: aC, iterations: 1 }, e10);
        }
        compute(e10, t10) {
          let r10, { cfg: i10 } = this, n10 = i10.hasher.create(), s10 = am.create(), a10 = s10.words, { keySize: o2, iterations: l2 } = i10;
          for (; a10.length < o2; ) {
            r10 && n10.update(r10), r10 = n10.update(e10).finalize(t10), n10.reset();
            for (let e11 = 1; e11 < l2; e11 += 1) r10 = n10.finalize(r10), n10.reset();
            s10.concat(r10);
          }
          return s10.sigBytes = 4 * o2, s10;
        }
      }, aI = class extends ab {
        constructor(e10, t10, r10) {
          super(), this.cfg = Object.assign(new af(), r10), this._xformMode = e10, this._key = t10, this.reset();
        }
        static createEncryptor(e10, t10) {
          return this.create(this._ENC_XFORM_MODE, e10, t10);
        }
        static createDecryptor(e10, t10) {
          return this.create(this._DEC_XFORM_MODE, e10, t10);
        }
        static _createHelper(e10) {
          let t10 = (e11) => "string" == typeof e11 ? aq : aD;
          return { encrypt: (r10, i10, n10) => t10(i10).encrypt(e10, r10, i10, n10), decrypt: (r10, i10, n10) => t10(i10).decrypt(e10, r10, i10, n10) };
        }
        reset() {
          super.reset.call(this), this._doReset();
        }
        process(e10) {
          return this._append(e10), this._process();
        }
        finalize(e10) {
          return e10 && this._append(e10), this._doFinalize();
        }
      };
      aI._ENC_XFORM_MODE = 1, aI._DEC_XFORM_MODE = 2, aI.keySize = 4, aI.ivSize = 4;
      var aP = class extends af {
        constructor(e10, t10) {
          super(), this._cipher = e10, this._iv = t10;
        }
        static createEncryptor(e10, t10) {
          return this.Encryptor.create(e10, t10);
        }
        static createDecryptor(e10, t10) {
          return this.Decryptor.create(e10, t10);
        }
      };
      function aA(e10, t10, r10) {
        let i10, n10 = this._iv;
        n10 ? (i10 = n10, this._iv = void 0) : i10 = this._prevBlock;
        for (let n11 = 0; n11 < r10; n11 += 1) e10[t10 + n11] ^= i10[n11];
      }
      var aN = class extends aP {
      };
      aN.Encryptor = class extends aN {
        processBlock(e10, t10) {
          let r10 = this._cipher, { blockSize: i10 } = r10;
          aA.call(this, e10, t10, i10), r10.encryptBlock(e10, t10), this._prevBlock = e10.slice(t10, t10 + i10);
        }
      }, aN.Decryptor = class extends aN {
        processBlock(e10, t10) {
          let r10 = this._cipher, { blockSize: i10 } = r10, n10 = e10.slice(t10, t10 + i10);
          r10.decryptBlock(e10, t10), aA.call(this, e10, t10, i10), this._prevBlock = n10;
        }
      };
      var aU = { pad(e10, t10) {
        let r10 = 4 * t10, i10 = r10 - e10.sigBytes % r10, n10 = i10 << 24 | i10 << 16 | i10 << 8 | i10, s10 = [];
        for (let e11 = 0; e11 < i10; e11 += 4) s10.push(n10);
        let a10 = am.create(s10, i10);
        e10.concat(a10);
      }, unpad(e10) {
        let t10 = 255 & e10.words[e10.sigBytes - 1 >>> 2];
        e10.sigBytes -= t10;
      } }, aM = class extends aI {
        constructor(e10, t10, r10) {
          super(e10, t10, Object.assign({ mode: aN, padding: aU }, r10)), this.blockSize = 4;
        }
        reset() {
          let e10;
          super.reset.call(this);
          let { cfg: t10 } = this, { iv: r10, mode: i10 } = t10;
          this._xformMode === this.constructor._ENC_XFORM_MODE ? e10 = i10.createEncryptor : (e10 = i10.createDecryptor, this._minBufferSize = 1), this._mode = e10.call(i10, this, r10 && r10.words), this._mode.__creator = e10;
        }
        _doProcessBlock(e10, t10) {
          this._mode.processBlock(e10, t10);
        }
        _doFinalize() {
          let e10, { padding: t10 } = this.cfg;
          return this._xformMode === this.constructor._ENC_XFORM_MODE ? (t10.pad(this._data, this.blockSize), e10 = this._process(true)) : (e10 = this._process(true), t10.unpad(e10)), e10;
        }
      }, aL = class extends af {
        constructor(e10) {
          super(), this.mixIn(e10);
        }
        toString(e10) {
          return (e10 || this.formatter).stringify(this);
        }
      }, aD = class extends af {
        static encrypt(e10, t10, r10, i10) {
          let n10 = Object.assign(new af(), this.cfg, i10), s10 = e10.createEncryptor(r10, n10), a10 = s10.finalize(t10), o2 = s10.cfg;
          return aL.create({ ciphertext: a10, key: r10, iv: o2.iv, algorithm: e10, mode: o2.mode, padding: o2.padding, blockSize: s10.blockSize, formatter: n10.format });
        }
        static decrypt(e10, t10, r10, i10) {
          let n10 = t10, s10 = Object.assign(new af(), this.cfg, i10);
          return n10 = this._parse(n10, s10.format), e10.createDecryptor(r10, s10).finalize(n10.ciphertext);
        }
        static _parse(e10, t10) {
          return "string" == typeof e10 ? t10.parse(e10, this) : e10;
        }
      };
      aD.cfg = Object.assign(new af(), { format: { stringify(e10) {
        let { ciphertext: t10, salt: r10 } = e10;
        return (r10 ? am.create([1398893684, 1701076831]).concat(r10).concat(t10) : t10).toString(ak);
      }, parse(e10) {
        let t10, r10 = ak.parse(e10), i10 = r10.words;
        return 1398893684 === i10[0] && 1701076831 === i10[1] && (t10 = am.create(i10.slice(2, 4)), i10.splice(0, 4), r10.sigBytes -= 16), aL.create({ ciphertext: r10, salt: t10 });
      } } });
      var aq = class extends aD {
        static encrypt(e10, t10, r10, i10) {
          let n10 = Object.assign(new af(), this.cfg, i10), s10 = n10.kdf.execute(r10, e10.keySize, e10.ivSize, n10.salt, n10.hasher);
          n10.iv = s10.iv;
          let a10 = aD.encrypt.call(this, e10, t10, s10.key, n10);
          return a10.mixIn(s10), a10;
        }
        static decrypt(e10, t10, r10, i10) {
          let n10 = t10, s10 = Object.assign(new af(), this.cfg, i10);
          n10 = this._parse(n10, s10.format);
          let a10 = s10.kdf.execute(r10, e10.keySize, e10.ivSize, n10.salt, s10.hasher);
          return s10.iv = a10.iv, aD.decrypt.call(this, e10, n10, a10.key, s10);
        }
      };
      aq.cfg = Object.assign(aD.cfg, { kdf: { execute(e10, t10, r10, i10, n10) {
        let s10, a10 = i10;
        a10 || (a10 = am.random(8)), s10 = n10 ? aR.create({ keySize: t10 + r10, hasher: n10 }).compute(e10, a10) : aR.create({ keySize: t10 + r10 }).compute(e10, a10);
        let o2 = am.create(s10.words.slice(t10), 4 * r10);
        return s10.sigBytes = 4 * t10, aL.create({ key: s10, iv: o2, salt: a10 });
      } } });
      var aj = [], aH = [], aB = [], az = [], aK = [], aJ = [], a$ = [], aF = [], aW = [], aV = [], aG = [];
      for (let e10 = 0; e10 < 256; e10 += 1) e10 < 128 ? aG[e10] = e10 << 1 : aG[e10] = e10 << 1 ^ 283;
      var aX = 0, aQ = 0;
      for (let e10 = 0; e10 < 256; e10 += 1) {
        let e11 = aQ ^ aQ << 1 ^ aQ << 2 ^ aQ << 3 ^ aQ << 4;
        e11 = e11 >>> 8 ^ 255 & e11 ^ 99, aj[aX] = e11, aH[e11] = aX;
        let t10 = aG[aX], r10 = aG[t10], i10 = aG[r10], n10 = 257 * aG[e11] ^ 16843008 * e11;
        aB[aX] = n10 << 24 | n10 >>> 8, az[aX] = n10 << 16 | n10 >>> 16, aK[aX] = n10 << 8 | n10 >>> 24, aJ[aX] = n10, n10 = 16843009 * i10 ^ 65537 * r10 ^ 257 * t10 ^ 16843008 * aX, a$[e11] = n10 << 24 | n10 >>> 8, aF[e11] = n10 << 16 | n10 >>> 16, aW[e11] = n10 << 8 | n10 >>> 24, aV[e11] = n10, aX ? (aX = t10 ^ aG[aG[aG[i10 ^ t10]]], aQ ^= aG[aG[aQ]]) : aX = aQ = 1;
      }
      var aY = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54], aZ = class extends aM {
        _doReset() {
          let e10;
          if (this._nRounds && this._keyPriorReset === this._key) return;
          this._keyPriorReset = this._key;
          let t10 = this._keyPriorReset, r10 = t10.words, i10 = t10.sigBytes / 4;
          this._nRounds = i10 + 6;
          let n10 = (this._nRounds + 1) * 4;
          this._keySchedule = [];
          let s10 = this._keySchedule;
          for (let t11 = 0; t11 < n10; t11 += 1) t11 < i10 ? s10[t11] = r10[t11] : (e10 = s10[t11 - 1], t11 % i10 ? i10 > 6 && t11 % i10 == 4 && (e10 = aj[e10 >>> 24] << 24 | aj[e10 >>> 16 & 255] << 16 | aj[e10 >>> 8 & 255] << 8 | aj[255 & e10]) : e10 = (aj[(e10 = e10 << 8 | e10 >>> 24) >>> 24] << 24 | aj[e10 >>> 16 & 255] << 16 | aj[e10 >>> 8 & 255] << 8 | aj[255 & e10]) ^ aY[t11 / i10 | 0] << 24, s10[t11] = s10[t11 - i10] ^ e10);
          this._invKeySchedule = [];
          let a10 = this._invKeySchedule;
          for (let t11 = 0; t11 < n10; t11 += 1) {
            let r11 = n10 - t11;
            e10 = t11 % 4 ? s10[r11] : s10[r11 - 4], t11 < 4 || r11 <= 4 ? a10[t11] = e10 : a10[t11] = a$[aj[e10 >>> 24]] ^ aF[aj[e10 >>> 16 & 255]] ^ aW[aj[e10 >>> 8 & 255]] ^ aV[aj[255 & e10]];
          }
        }
        encryptBlock(e10, t10) {
          this._doCryptBlock(e10, t10, this._keySchedule, aB, az, aK, aJ, aj);
        }
        decryptBlock(e10, t10) {
          let r10 = e10[t10 + 1];
          e10[t10 + 1] = e10[t10 + 3], e10[t10 + 3] = r10, this._doCryptBlock(e10, t10, this._invKeySchedule, a$, aF, aW, aV, aH), r10 = e10[t10 + 1], e10[t10 + 1] = e10[t10 + 3], e10[t10 + 3] = r10;
        }
        _doCryptBlock(e10, t10, r10, i10, n10, s10, a10, o2) {
          let l2 = this._nRounds, c2 = e10[t10] ^ r10[0], u2 = e10[t10 + 1] ^ r10[1], d2 = e10[t10 + 2] ^ r10[2], h2 = e10[t10 + 3] ^ r10[3], p2 = 4;
          for (let e11 = 1; e11 < l2; e11 += 1) {
            let e12 = i10[c2 >>> 24] ^ n10[u2 >>> 16 & 255] ^ s10[d2 >>> 8 & 255] ^ a10[255 & h2] ^ r10[p2];
            p2 += 1;
            let t11 = i10[u2 >>> 24] ^ n10[d2 >>> 16 & 255] ^ s10[h2 >>> 8 & 255] ^ a10[255 & c2] ^ r10[p2];
            p2 += 1;
            let o3 = i10[d2 >>> 24] ^ n10[h2 >>> 16 & 255] ^ s10[c2 >>> 8 & 255] ^ a10[255 & u2] ^ r10[p2];
            p2 += 1;
            let l3 = i10[h2 >>> 24] ^ n10[c2 >>> 16 & 255] ^ s10[u2 >>> 8 & 255] ^ a10[255 & d2] ^ r10[p2];
            p2 += 1, c2 = e12, u2 = t11, d2 = o3, h2 = l3;
          }
          let f2 = (o2[c2 >>> 24] << 24 | o2[u2 >>> 16 & 255] << 16 | o2[d2 >>> 8 & 255] << 8 | o2[255 & h2]) ^ r10[p2];
          p2 += 1;
          let m2 = (o2[u2 >>> 24] << 24 | o2[d2 >>> 16 & 255] << 16 | o2[h2 >>> 8 & 255] << 8 | o2[255 & c2]) ^ r10[p2];
          p2 += 1;
          let g2 = (o2[d2 >>> 24] << 24 | o2[h2 >>> 16 & 255] << 16 | o2[c2 >>> 8 & 255] << 8 | o2[255 & u2]) ^ r10[p2];
          p2 += 1;
          let y2 = (o2[h2 >>> 24] << 24 | o2[c2 >>> 16 & 255] << 16 | o2[u2 >>> 8 & 255] << 8 | o2[255 & d2]) ^ r10[p2];
          p2 += 1, e10[t10] = f2, e10[t10 + 1] = m2, e10[t10 + 2] = g2, e10[t10 + 3] = y2;
        }
      };
      aZ.keySize = 8;
      var a0 = aM._createHelper(aZ), a1 = [], a2 = class extends av {
        _doReset() {
          this._hash = new am([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
        }
        _doProcessBlock(e10, t10) {
          let r10 = this._hash.words, i10 = r10[0], n10 = r10[1], s10 = r10[2], a10 = r10[3], o2 = r10[4];
          for (let r11 = 0; r11 < 80; r11 += 1) {
            if (r11 < 16) a1[r11] = 0 | e10[t10 + r11];
            else {
              let e11 = a1[r11 - 3] ^ a1[r11 - 8] ^ a1[r11 - 14] ^ a1[r11 - 16];
              a1[r11] = e11 << 1 | e11 >>> 31;
            }
            let l2 = (i10 << 5 | i10 >>> 27) + o2 + a1[r11];
            r11 < 20 ? l2 += (n10 & s10 | ~n10 & a10) + 1518500249 : r11 < 40 ? l2 += (n10 ^ s10 ^ a10) + 1859775393 : r11 < 60 ? l2 += (n10 & s10 | n10 & a10 | s10 & a10) - 1894007588 : l2 += (n10 ^ s10 ^ a10) - 899497514, o2 = a10, a10 = s10, s10 = n10 << 30 | n10 >>> 2, n10 = i10, i10 = l2;
          }
          r10[0] = r10[0] + i10 | 0, r10[1] = r10[1] + n10 | 0, r10[2] = r10[2] + s10 | 0, r10[3] = r10[3] + a10 | 0, r10[4] = r10[4] + o2 | 0;
        }
        _doFinalize() {
          let e10 = this._data, t10 = e10.words, r10 = 8 * this._nDataBytes, i10 = 8 * e10.sigBytes;
          return t10[i10 >>> 5] |= 128 << 24 - i10 % 32, t10[(i10 + 64 >>> 9 << 4) + 14] = Math.floor(r10 / 4294967296), t10[(i10 + 64 >>> 9 << 4) + 15] = r10, e10.sigBytes = 4 * t10.length, this._process(), this._hash;
        }
        clone() {
          let e10 = super.clone.call(this);
          return e10._hash = this._hash.clone(), e10;
        }
      }, a4 = (av._createHelper(a2), av._createHmacHelper(a2));
      let a5 = `
Missing domain and proxyUrl. A satellite application needs to specify a domain or a proxyUrl.

1) With middleware
   e.g. export default clerkMiddleware({domain:'YOUR_DOMAIN',isSatellite:true});
2) With environment variables e.g.
   NEXT_PUBLIC_CLERK_DOMAIN='YOUR_DOMAIN'
   NEXT_PUBLIC_CLERK_IS_SATELLITE='true'
   `, a3 = `
Invalid signInUrl. A satellite application requires a signInUrl for development instances.
Check if signInUrl is missing from your configuration or if it is not an absolute URL

1) With middleware
   e.g. export default clerkMiddleware({signInUrl:'SOME_URL', isSatellite:true});
2) With environment variables e.g.
   NEXT_PUBLIC_CLERK_SIGN_IN_URL='SOME_URL'
   NEXT_PUBLIC_CLERK_IS_SATELLITE='true'`, a6 = `Clerk: Unable to decrypt request data.

Refresh the page if your .env file was just updated. If the issue persists, ensure the encryption key is valid and properly set.

For more information, see: https://clerk.com/docs/references/nextjs/clerk-middleware#dynamic-keys. (code=encryption_key_invalid)`, a9 = tg({ packageName: "@clerk/nextjs" }), a8 = "x-middleware-override-headers", a7 = "x-middleware-request", oe = (e10, t10, r10) => {
        e10.headers.get(a8) || (e10.headers.set(a8, [...t10.headers.keys()]), t10.headers.forEach((t11, r11) => {
          e10.headers.set(`${a7}-${r11}`, t11);
        })), Object.entries(r10).forEach(([t11, r11]) => {
          e10.headers.set(a8, `${e10.headers.get(a8)},${t11}`), e10.headers.set(`${a7}-${t11}`, r11);
        });
      }, ot = (e10) => H.redirect(e10, { headers: { [t4.Headers.ClerkRedirectTo]: "true" } }), or = "clerk_keyless_dummy_key";
      function oi() {
        if (td()) throw Error("Clerk: Unable to decrypt request data, this usually means the encryption key is invalid. Ensure the encryption key is properly set. For more information, see: https://clerk.com/docs/references/nextjs/clerk-middleware#dynamic-keys. (code=encryption_key_invalid)");
        throw Error(a6);
      }
      function on(e10, t10) {
        return JSON.parse(a0.decrypt(e10, t10).toString(a_));
      }
      let os = async () => {
        var e10, t10;
        let r10;
        try {
          let e11 = await sA(), t11 = sj(e11, t4.Headers.ClerkRequestData);
          r10 = function(e12) {
            if (!e12) return {};
            let t12 = td() ? sw || s_ : sw || s_ || or;
            try {
              return on(e12, t12);
            } catch {
              if (sI) try {
                return on(e12, or);
              } catch {
                oi();
              }
              oi();
            }
          }(t11);
        } catch (e11) {
          if (e11 && sP(e11)) throw e11;
        }
        let i10 = null != (t10 = null == (e10 = sz.getStore()) ? void 0 : e10.get("requestData")) ? t10 : r10;
        return (null == i10 ? void 0 : i10.secretKey) || (null == i10 ? void 0 : i10.publishableKey) ? sq(i10) : sq({});
      };
      class oa {
        static createDefaultDirectives() {
          return Object.entries(this.DEFAULT_DIRECTIVES).reduce((e10, [t10, r10]) => (e10[t10] = new Set(r10), e10), {});
        }
        static isKeyword(e10) {
          return this.KEYWORDS.has(e10.replace(/^'|'$/g, ""));
        }
        static formatValue(e10) {
          let t10 = e10.replace(/^'|'$/g, "");
          return this.isKeyword(t10) ? `'${t10}'` : e10;
        }
        static handleDirectiveValues(e10) {
          let t10 = /* @__PURE__ */ new Set();
          return e10.includes("'none'") || e10.includes("none") ? t10.add("'none'") : e10.forEach((e11) => t10.add(this.formatValue(e11))), t10;
        }
      }
      oa.KEYWORDS = /* @__PURE__ */ new Set(["none", "self", "strict-dynamic", "unsafe-eval", "unsafe-hashes", "unsafe-inline"]), oa.DEFAULT_DIRECTIVES = { "connect-src": ["self", "https://clerk-telemetry.com", "https://*.clerk-telemetry.com", "https://api.stripe.com", "https://maps.googleapis.com"], "default-src": ["self"], "form-action": ["self"], "frame-src": ["self", "https://challenges.cloudflare.com", "https://*.js.stripe.com", "https://js.stripe.com", "https://hooks.stripe.com"], "img-src": ["self", "https://img.clerk.com"], "script-src": ["self", "unsafe-inline", "https:", "http:", "https://*.js.stripe.com", "https://js.stripe.com", "https://maps.googleapis.com"], "style-src": ["self", "unsafe-inline"], "worker-src": ["self", "blob:"] };
      let oo = "__clerk_keys_";
      async function ol(e10) {
        let t10 = new TextEncoder().encode(e10);
        return Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", t10))).map((e11) => e11.toString(16).padStart(2, "0")).join("").slice(0, 16);
      }
      async function oc() {
        let e10 = process.env.PWD;
        if (!e10) return `${oo}0`;
        let t10 = e10.split("/").filter(Boolean).slice(-3).reverse().join("/"), r10 = await ol(t10);
        return `${oo}${r10}`;
      }
      async function ou(e10) {
        let t10;
        if (!sI) return;
        let r10 = await oc();
        try {
          t10 = JSON.parse(e10(r10) || "{}");
        } catch {
          t10 = void 0;
        }
        return t10;
      }
      let od = { REDIRECT_TO_URL: "CLERK_PROTECT_REDIRECT_TO_URL", REDIRECT_TO_SIGN_IN: "CLERK_PROTECT_REDIRECT_TO_SIGN_IN", REDIRECT_TO_SIGN_UP: "CLERK_PROTECT_REDIRECT_TO_SIGN_UP" }, oh = { NOT_FOUND: 404, FORBIDDEN: 403, UNAUTHORIZED: 401 }, op = new Set(Object.values(oh)), of = "NEXT_HTTP_ERROR_FALLBACK";
      function om(e10) {
        if (!function(e11) {
          if ("object" != typeof e11 || null === e11 || !("digest" in e11) || "string" != typeof e11.digest) return false;
          let [t11, r10] = e11.digest.split(";");
          return t11 === of && op.has(Number(r10));
        }(e10)) return;
        let [, t10] = e10.digest.split(";");
        return Number(t10);
      }
      let og = "NEXT_REDIRECT";
      function oy(e10, t10, r10 = "replace", i10 = 307) {
        let n10 = Error(og);
        throw n10.digest = `${og};${r10};${e10};${i10};`, n10.clerk_digest = od.REDIRECT_TO_URL, Object.assign(n10, t10), n10;
      }
      function o_(e10, t10) {
        return null === t10 ? "" : t10 || e10;
      }
      function ob(e10) {
        if ("object" != typeof e10 || null === e10 || !("digest" in e10) || "string" != typeof e10.digest) return false;
        let t10 = e10.digest.split(";"), [r10, i10] = t10, n10 = t10.slice(2, -2).join(";"), s10 = Number(t10.at(-2));
        return r10 === og && ("replace" === i10 || "push" === i10) && "string" == typeof n10 && !isNaN(s10) && 307 === s10;
      }
      function ov() {
        let e10 = Error(of);
        throw e10.digest = `${of};${oh.UNAUTHORIZED}`, e10;
      }
      let ow = (e10) => !!e10.headers.get(sl.Headers.NextUrl) && !((e11) => {
        var t10, r10;
        return !!e11.headers.get(sl.Headers.NextUrl) && ((null == (t10 = e11.headers.get(t4.Headers.Accept)) ? void 0 : t10.includes("text/x-component")) || (null == (r10 = e11.headers.get(t4.Headers.ContentType)) ? void 0 : r10.includes("multipart/form-data")) || !!e11.headers.get(sl.Headers.NextAction));
      })(e10) || ok(), ok = () => {
        let e10 = globalThis.fetch;
        if (!function(e11) {
          return "__nextPatched" in e11 && true === e11.__nextPatched;
        }(e10)) return false;
        let { page: t10, pagePath: r10 } = e10.__nextGetStaticStore().getStore() || {};
        return !!(r10 || t10);
      }, oS = (e10) => !!e10.headers.get(sl.Headers.NextjsData), oT = ((e10) => {
        if ("function" == typeof e10) return (t11) => e10(t11);
        let t10 = ((e11) => {
          let t11 = [e11 || ""].flat().filter(Boolean).map((e12) => e12 instanceof RegExp ? e12 : ((e13) => {
            try {
              return tQ(e13);
            } catch (t12) {
              throw Error(`Invalid path: ${e13}.
Consult the documentation of path-to-regexp here: https://github.com/pillarjs/path-to-regexp/tree/6.x
${t12.message}`);
            }
          })(e12));
          return (e12) => t11.some((t12) => t12.test(e12));
        })(e10);
        return (e11) => t10(e11.nextUrl.pathname);
      })(["/dashboard(.*)"]), oE = ((...e10) => {
        let [t10, r10] = ((e11) => [e11[0] instanceof Request ? e11[0] : void 0, e11[0] instanceof Request ? e11[1] : void 0])(e10), [i10, n10] = ((e11) => ["function" == typeof e11[0] ? e11[0] : void 0, (2 === e11.length ? e11[1] : "function" == typeof e11[0] ? {} : e11[0]) || {}])(e10);
        return sz.run(sB, () => {
          let e11 = /* @__PURE__ */ ((e12, t11) => (...r11) => {
            let i11 = ("string" == typeof e12 ? /* @__PURE__ */ ((e13, t12) => () => {
              let r12 = [], i12 = false;
              return { enable: () => {
                i12 = true;
              }, debug: (...e14) => {
                i12 && r12.push(e14.map((e15) => "function" == typeof e15 ? e15() : e15));
              }, commit: () => {
                if (i12) {
                  var n12, s11;
                  for (let i13 of (console.log((n12 = e13, `[clerk debug start: ${n12}]`)), r12)) {
                    let e14 = t12(i13);
                    e14 = e14.split("\n").map((e15) => `  ${e15}`).join("\n"), process.env.VERCEL && (e14 = function(e15, t13) {
                      let r13 = new TextEncoder(), i14 = new TextDecoder("utf-8"), n13 = r13.encode(e15).slice(0, 4096);
                      return i14.decode(n13).replace(/\uFFFD/g, "");
                    }(e14, 4096)), console.log(e14);
                  }
                  console.log((s11 = e13, `[clerk debug end: ${s11}] (@clerk/nextjs=6.31.8,next=${sd.default.version},timestamp=${Math.round((/* @__PURE__ */ new Date()).getTime() / 1e3)})`));
                }
              } };
            })(e12, sp) : e12)(), n11 = t11(i11);
            try {
              let e13 = n11(...r11);
              if ("object" == typeof e13 && "then" in e13 && "function" == typeof e13.then) return e13.then((e14) => (i11.commit(), e14)).catch((e14) => {
                throw i11.commit(), e14;
              });
              return i11.commit(), e13;
            } catch (e13) {
              throw i11.commit(), e13;
            }
          })("clerkMiddleware", (e12) => async (t11, r11) => {
            var s11, a11;
            let o2, l2, c2, u2, d2, h2, p2, f2, m2 = "function" == typeof n10 ? await n10(t11) : n10, g2 = await ou((e13) => {
              var r12;
              return null == (r12 = t11.cookies.get(e13)) ? void 0 : r12.value;
            }), y2 = function(e13, t12) {
              return e13 || t12(), e13;
            }(m2.publishableKey || sv || (null == g2 ? void 0 : g2.publishableKey), () => a9.throwMissingPublishableKeyError()), _2 = function(e13, t12) {
              return e13 || t12(), e13;
            }(m2.secretKey || s_ || (null == g2 ? void 0 : g2.secretKey), () => a9.throwMissingSecretKeyError()), b2 = { publishableKey: y2, secretKey: _2, signInUrl: m2.signInUrl || sx, signUpUrl: m2.signUpUrl || "/sign-up", ...m2 };
            sB.set("requestData", b2);
            let v2 = await os();
            b2.debug && e12.enable();
            let w2 = nR(t11);
            e12.debug("options", b2), e12.debug("url", () => w2.toJSON());
            let k2 = t11.headers.get(t4.Headers.Authorization);
            k2 && k2.startsWith("Basic ") && e12.debug("Basic Auth detected");
            let S2 = t11.headers.get(t4.Headers.ContentSecurityPolicy);
            S2 && e12.debug("Content-Security-Policy detected", () => ({ value: S2 }));
            let T2 = await v2.authenticateRequest(w2, ((e13, t12) => ({ ...t12, ...((e14, t13) => {
              let r12, i11 = sf(null == t13 ? void 0 : t13.proxyUrl, e14.clerkUrl, sT);
              r12 = i11 && !s$(i11) ? new URL(i11, e14.clerkUrl).toString() : i11;
              let n11 = sf(t13.isSatellite, new URL(e14.url), sE), s12 = sf(t13.domain, new URL(e14.url), sS), a12 = (null == t13 ? void 0 : t13.signInUrl) || sx;
              if (n11 && !r12 && !s12) throw Error(a5);
              if (n11 && !s$(a12) && tc(t13.secretKey || s_)) throw Error(a3);
              return { proxyUrl: r12, isSatellite: n11, domain: s12, signInUrl: a12 };
            })(e13, t12), acceptsToken: "any" }))(w2, b2));
            e12.debug("requestState", () => ({ status: T2.status, headers: JSON.stringify(Object.fromEntries(T2.headers)), reason: T2.reason }));
            let E2 = T2.headers.get(t4.Headers.Location);
            if (E2) {
              let e13 = H.redirect(E2);
              return T2.headers.forEach((t12, r12) => {
                r12 !== t4.Headers.Location && e13.headers.append(r12, t12);
              }), e13;
            }
            if (T2.status === nw.Handshake) throw Error("Clerk: handshake status without redirect");
            let x2 = T2.toAuth();
            e12.debug("auth", () => ({ auth: x2, debug: x2.debug() }));
            let O2 = (o2 = w2, (e13 = {}) => {
              !function(e14, t12) {
                oy(e14, { clerk_digest: od.REDIRECT_TO_SIGN_IN, returnBackUrl: o_(e14, t12) });
              }(o2.clerkUrl.toString(), e13.returnBackUrl);
            }), C2 = (l2 = w2, (e13 = {}) => {
              !function(e14, t12) {
                oy(e14, { clerk_digest: od.REDIRECT_TO_SIGN_UP, returnBackUrl: o_(e14, t12) });
              }(l2.clerkUrl.toString(), e13.returnBackUrl);
            }), R2 = await (c2 = w2, u2 = x2, d2 = O2, async (e13, t12) => function(e14) {
              let { redirectToSignIn: t13, authObject: r12, redirect: i11, notFound: n11, request: s12, unauthorized: a12 } = e14;
              return async (...e15) => {
                var o3, l3, c3, u3, d3, h3, p3, f3;
                let m3 = ((e16) => {
                  if (e16 && !e16.unauthenticatedUrl && !e16.unauthorizedUrl && !e16.token && (1 !== Object.keys(e16).length || !("token" in e16))) return e16;
                })(e15[0]), g3 = (null == (o3 = e15[0]) ? void 0 : o3.unauthenticatedUrl) || (null == (l3 = e15[1]) ? void 0 : l3.unauthenticatedUrl), y3 = (null == (c3 = e15[0]) ? void 0 : c3.unauthorizedUrl) || (null == (u3 = e15[1]) ? void 0 : u3.unauthorizedUrl), _3 = (null == (d3 = e15[0]) ? void 0 : d3.token) || (null == (h3 = e15[1]) ? void 0 : h3.token) || t8.SessionToken, b3 = () => r12.tokenType !== t8.SessionToken ? a12() : y3 ? i11(y3) : n11();
                if (!nm(r12.tokenType, _3)) return b3();
                if (r12.tokenType !== t8.SessionToken) return r12.isAuthenticated ? r12 : b3();
                if ("pending" === r12.sessionStatus || !r12.userId) {
                  return g3 ? i11(g3) : "document" === (p3 = s12).headers.get(t4.Headers.SecFetchDest) || "iframe" === p3.headers.get(t4.Headers.SecFetchDest) || (null == (f3 = p3.headers.get(t4.Headers.Accept)) ? void 0 : f3.includes("text/html")) || ow(p3) || oS(p3) ? t13() : n11();
                }
                return m3 ? "function" == typeof m3 ? m3(r12.has) ? r12 : b3() : r12.has(m3) ? r12 : b3() : r12;
              };
            }({ request: c2, redirect: (e14) => oy(e14, { redirectUrl: e14 }), notFound: () => function() {
              let e14 = Object.defineProperty(Error(n4), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
              throw e14.digest = n4, e14;
            }(), unauthorized: ov, authObject: nv({ authObject: u2, acceptsToken: (null == e13 ? void 0 : e13.token) || (null == t12 ? void 0 : t12.token) || t8.SessionToken }), redirectToSignIn: d2 })(e13, t12)), I2 = (h2 = T2, p2 = O2, f2 = C2, async (e13) => {
              var t12;
              let r12 = h2.toAuth({ treatPendingAsSignedOut: null == e13 ? void 0 : e13.treatPendingAsSignedOut }), i11 = null != (t12 = null == e13 ? void 0 : e13.acceptsToken) ? t12 : t8.SessionToken, n11 = nv({ authObject: r12, acceptsToken: i11 });
              return n11.tokenType === t8.SessionToken && nm(t8.SessionToken, i11) ? Object.assign(n11, { redirectToSignIn: p2, redirectToSignUp: f2 }) : n11;
            });
            I2.protect = R2;
            let P2 = H.next();
            try {
              P2 = await sz.run(sB, async () => null == i10 ? void 0 : i10(I2, t11, r11)) || P2;
            } catch (e13) {
              P2 = ((e14, t12, r12, i11) => {
                var n11;
                if (om(e14) === oh.UNAUTHORIZED) {
                  let e15 = new H(null, { status: 401 }), t13 = i11.toAuth();
                  if (t13 && t13.tokenType === t8.OAuthToken) {
                    let t14 = to(i11.publishableKey);
                    return sc(e15, "WWW-Authenticate", `Bearer resource_metadata="https://${null == t14 ? void 0 : t14.frontendApi}/.well-known/oauth-protected-resource"`);
                  }
                  return e15;
                }
                if (function(e15) {
                  return "object" == typeof e15 && null !== e15 && "digest" in e15 && "NEXT_NOT_FOUND" === e15.digest || om(e15) === oh.NOT_FOUND;
                }(e14)) return sc(H.rewrite(new URL(`/clerk_${Date.now()}`, r12.url)), t4.Headers.AuthReason, "protect-rewrite");
                let s12 = function(e15) {
                  return !!ob(e15) && "clerk_digest" in e15 && e15.clerk_digest === od.REDIRECT_TO_SIGN_IN;
                }(e14), a12 = function(e15) {
                  return !!ob(e15) && "clerk_digest" in e15 && e15.clerk_digest === od.REDIRECT_TO_SIGN_UP;
                }(e14);
                if (s12 || a12) {
                  let r13 = ((e15) => {
                    let { publishableKey: t13, redirectAdapter: r14, signInUrl: i12, signUpUrl: n12, baseUrl: s13, sessionStatus: a14 } = e15, o3 = to(t13), l3 = o3?.frontendApi, c3 = o3?.instanceType === "development", u3 = tB(l3), d3 = "pending" === a14, h3 = (t14, { returnBackUrl: i13 }) => r14(t5(s13, `${t14}/tasks`, i13, c3 ? e15.devBrowserToken : null));
                    return { redirectToSignUp: ({ returnBackUrl: t14 } = {}) => {
                      n12 || u3 || ty.throwMissingPublishableKeyError();
                      let a15 = `${u3}/sign-up`, o4 = n12 || function(e16) {
                        if (!e16) return;
                        let t15 = new URL(e16, s13);
                        return t15.pathname = `${t15.pathname}/create`, t15.toString();
                      }(i12) || a15;
                      return d3 ? h3(o4, { returnBackUrl: t14 }) : r14(t5(s13, o4, t14, c3 ? e15.devBrowserToken : null));
                    }, redirectToSignIn: ({ returnBackUrl: t14 } = {}) => {
                      i12 || u3 || ty.throwMissingPublishableKeyError();
                      let n13 = `${u3}/sign-in`, a15 = i12 || n13;
                      return d3 ? h3(a15, { returnBackUrl: t14 }) : r14(t5(s13, a15, t14, c3 ? e15.devBrowserToken : null));
                    } };
                  })({ redirectAdapter: ot, baseUrl: t12.clerkUrl, signInUrl: i11.signInUrl, signUpUrl: i11.signUpUrl, publishableKey: i11.publishableKey, sessionStatus: null == (n11 = i11.toAuth()) ? void 0 : n11.sessionStatus }), { returnBackUrl: a13 } = e14;
                  return r13[s12 ? "redirectToSignIn" : "redirectToSignUp"]({ returnBackUrl: a13 });
                }
                if (ob(e14)) return ot(e14.redirectUrl);
                throw e14;
              })(e13, w2, t11, T2);
            }
            if (b2.contentSecurityPolicy) {
              let { headers: t12 } = function(e13, t13) {
                var r12;
                let i11 = [], n11 = t13.strict ? function() {
                  let e14 = new Uint8Array(16);
                  return crypto.getRandomValues(e14), btoa(Array.from(e14, (e15) => String.fromCharCode(e15)).join(""));
                }() : void 0, s12 = function(e14, t14, r13, i12) {
                  let n12 = Object.entries(oa.DEFAULT_DIRECTIVES).reduce((e15, [t15, r14]) => (e15[t15] = new Set(r14), e15), {});
                  if (n12["connect-src"].add(t14), e14 && (n12["script-src"].delete("http:"), n12["script-src"].delete("https:"), n12["script-src"].add("'strict-dynamic'"), i12 && n12["script-src"].add(`'nonce-${i12}'`)), r13) {
                    let e15 = /* @__PURE__ */ new Map();
                    Object.entries(r13).forEach(([t15, r14]) => {
                      let i13 = Array.isArray(r14) ? r14 : [r14];
                      oa.DEFAULT_DIRECTIVES[t15] ? function(e16, t16, r15) {
                        if (r15.includes("'none'") || r15.includes("none")) {
                          e16[t16] = /* @__PURE__ */ new Set(["'none'"]);
                          return;
                        }
                        let i14 = /* @__PURE__ */ new Set();
                        e16[t16].forEach((e17) => {
                          i14.add(oa.formatValue(e17));
                        }), r15.forEach((e17) => {
                          i14.add(oa.formatValue(e17));
                        }), e16[t16] = i14;
                      }(n12, t15, i13) : function(e16, t16, r15) {
                        if (r15.includes("'none'") || r15.includes("none")) return e16.set(t16, /* @__PURE__ */ new Set(["'none'"]));
                        let i14 = /* @__PURE__ */ new Set();
                        r15.forEach((e17) => {
                          let t17 = oa.formatValue(e17);
                          i14.add(t17);
                        }), e16.set(t16, i14);
                      }(e15, t15, i13);
                    }), e15.forEach((e16, t15) => {
                      n12[t15] = e16;
                    });
                  }
                  return Object.entries(n12).sort(([e15], [t15]) => e15.localeCompare(t15)).map(([e15, t15]) => {
                    let r14 = Array.from(t15).map((e16) => ({ raw: e16, formatted: oa.formatValue(e16) }));
                    return `${e15} ${r14.map((e16) => e16.formatted).join(" ")}`;
                  }).join("; ");
                }(null != (r12 = t13.strict) && r12, e13, t13.directives, n11);
                return t13.reportTo && (s12 += "; report-to csp-endpoint", i11.push([t4.Headers.ReportingEndpoints, `csp-endpoint="${t13.reportTo}"`])), t13.reportOnly ? i11.push([t4.Headers.ContentSecurityPolicyReportOnly, s12]) : i11.push([t4.Headers.ContentSecurityPolicy, s12]), n11 && i11.push([t4.Headers.Nonce, n11]), { headers: i11 };
              }((null != (a11 = null == (s11 = to(y2)) ? void 0 : s11.frontendApi) ? a11 : "").replace("$", ""), b2.contentSecurityPolicy);
              t12.forEach(([e13, t13]) => {
                sc(P2, e13, t13);
              }), e12.debug("Clerk generated CSP", () => ({ headers: t12 }));
            }
            if (T2.headers && T2.headers.forEach((t12, r12) => {
              r12 === t4.Headers.ContentSecurityPolicy && e12.debug("Content-Security-Policy detected", () => ({ value: t12 })), P2.headers.append(r12, t12);
            }), P2.headers.get(sl.Headers.NextRedirect)) return e12.debug("handlerResult is redirect"), ((e13, t12, r12) => {
              let i11 = t12.headers.get("location");
              if ("true" === t12.headers.get(t4.Headers.ClerkRedirectTo) && i11 && tc(r12.secretKey) && e13.clerkUrl.isCrossOrigin(i11)) {
                let r13 = e13.cookies.get(su) || "", n11 = function(e14, t13) {
                  let r14 = new URL(e14), i12 = r14.searchParams.get(su);
                  r14.searchParams.delete(su);
                  let n12 = i12 || t13;
                  return n12 && r14.searchParams.set(su, n12), r14;
                }(new URL(i11), r13);
                return H.redirect(n11.href, t12);
              }
              return t12;
            })(w2, P2, b2);
            b2.debug && oe(P2, w2, { [t4.Headers.EnableDebug]: "true" });
            let A2 = _2 === (null == g2 ? void 0 : g2.secretKey) ? { publishableKey: null == g2 ? void 0 : g2.publishableKey, secretKey: null == g2 ? void 0 : g2.secretKey } : {};
            return !function(e13, t12, r12, i11, n11, s12) {
              let a12, { reason: o3, message: l3, status: c3, token: u3 } = r12;
              if (t12 || (t12 = H.next()), t12.headers.get(sl.Headers.NextRedirect)) return;
              "1" === t12.headers.get(sl.Headers.NextResume) && (t12.headers.delete(sl.Headers.NextResume), a12 = new URL(e13.url));
              let d3 = t12.headers.get(sl.Headers.NextRewrite);
              if (d3) {
                let t13 = new URL(e13.url);
                if ((a12 = new URL(d3)).origin !== t13.origin) return;
              }
              if (a12) {
                let r13 = function(e14, t13, r14) {
                  var i12;
                  let n12 = (e15) => !e15 || !Object.values(e15).some((e16) => void 0 !== e16);
                  if (n12(e14) && n12(t13) && !r14) return;
                  if (e14.secretKey && !sw) return void sJ.warnOnce("Clerk: Missing `CLERK_ENCRYPTION_KEY`. Required for propagating `secretKey` middleware option. See docs: https://clerk.com/docs/references/nextjs/clerk-middleware#dynamic-keys");
                  let s13 = td() ? sw || (i12 = () => a9.throwMissingSecretKeyError(), s_ || i12(), s_) : sw || s_ || or;
                  return a0.encrypt(JSON.stringify({ ...t13, ...e14, machineAuthObject: null != r14 ? r14 : void 0 }), s13).toString();
                }(i11, n11, s12);
                oe(t12, e13, { [t4.Headers.AuthStatus]: c3, [t4.Headers.AuthToken]: u3 || "", [t4.Headers.AuthSignature]: u3 ? a4(u3, (null == i11 ? void 0 : i11.secretKey) || s_ || n11.secretKey || "").toString() : "", [t4.Headers.AuthMessage]: l3 || "", [t4.Headers.AuthReason]: o3 || "", [t4.Headers.ClerkUrl]: e13.clerkUrl.toString(), ...r13 ? { [t4.Headers.ClerkRequestData]: r13 } : {} }), t12.headers.set(sl.Headers.NextRewrite, a12.href);
              }
            }(w2, P2, T2, m2, A2, "session_token" === x2.tokenType ? null : ((e13) => {
              let { debug: t12, getToken: r12, has: i11, ...n11 } = e13;
              return n11;
            })(x2)), P2;
          }), s10 = async (t11, r11) => {
            var i11, s11;
            if ("/clerk-sync-keyless" === t11.nextUrl.pathname) return ((e12) => {
              let t12 = e12.nextUrl.searchParams.get("returnUrl"), r12 = new URL(e12.url);
              return r12.pathname = "", H.redirect(t12 || r12.toString());
            })(t11);
            let a11 = "function" == typeof n10 ? await n10(t11) : n10, o2 = await ou((e12) => {
              var r12;
              return null == (r12 = t11.cookies.get(e12)) ? void 0 : r12.value;
            }), l2 = !(a11.publishableKey || sv || (null == o2 ? void 0 : o2.publishableKey)), c2 = null != (s11 = null == (i11 = sj(t11, t4.Headers.Authorization)) ? void 0 : i11.replace("Bearer ", "")) ? s11 : "";
            if (l2 && !np(c2)) {
              let e12 = H.next();
              return oe(e12, t11, { [t4.Headers.AuthStatus]: "signed-out" }), e12;
            }
            return e11(t11, r11);
          }, a10 = async (t11, r11) => sI ? s10(t11, r11) : e11(t11, r11);
          return t10 && r10 ? a10(t10, r10) : a10;
        });
      })(async (e10, t10) => {
        oT(t10) && await e10.protect();
      }), ox = { matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)", "/(api|trpc)(.*)"] };
      var oO = e.i(99446);
      e.i(96588);
      let oC = { ...oO }, oR = oC.middleware || oC.default, oI = "/middleware";
      if ("function" != typeof oR) throw Object.defineProperty(Error(`The Middleware "${oI}" must export a \`middleware\` or a \`default\` function`), "__NEXT_ERROR_CODE", { value: "E120", enumerable: false, configurable: true });
      function oP(e10) {
        return eQ({ ...e10, page: oI, handler: async (...e11) => {
          try {
            return await oR(...e11);
          } catch (n10) {
            let t10 = e11[0], r10 = new URL(t10.url), i10 = r10.pathname + r10.search;
            throw await s(n10, { path: i10, method: t10.method, headers: Object.fromEntries(t10.headers.entries()) }, { routerKind: "Pages Router", routePath: "/middleware", routeType: "middleware", revalidateReason: void 0 }), n10;
          }
        } });
      }
    }]);
  }
});

// .next/server/edge/chunks/node_modules_next_dist_f455c4eb._.js
var require_node_modules_next_dist_f455c4eb = __commonJS({
  ".next/server/edge/chunks/node_modules_next_dist_f455c4eb._.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/node_modules_next_dist_f455c4eb._.js", 28042, (e, t, r) => {
      "use strict";
      var n = Object.defineProperty, s = Object.getOwnPropertyDescriptor, o = Object.getOwnPropertyNames, a = Object.prototype.hasOwnProperty, i = {};
      function u(e2) {
        var t2;
        let r2 = ["path" in e2 && e2.path && `Path=${e2.path}`, "expires" in e2 && (e2.expires || 0 === e2.expires) && `Expires=${("number" == typeof e2.expires ? new Date(e2.expires) : e2.expires).toUTCString()}`, "maxAge" in e2 && "number" == typeof e2.maxAge && `Max-Age=${e2.maxAge}`, "domain" in e2 && e2.domain && `Domain=${e2.domain}`, "secure" in e2 && e2.secure && "Secure", "httpOnly" in e2 && e2.httpOnly && "HttpOnly", "sameSite" in e2 && e2.sameSite && `SameSite=${e2.sameSite}`, "partitioned" in e2 && e2.partitioned && "Partitioned", "priority" in e2 && e2.priority && `Priority=${e2.priority}`].filter(Boolean), n2 = `${e2.name}=${encodeURIComponent(null != (t2 = e2.value) ? t2 : "")}`;
        return 0 === r2.length ? n2 : `${n2}; ${r2.join("; ")}`;
      }
      function c(e2) {
        let t2 = /* @__PURE__ */ new Map();
        for (let r2 of e2.split(/; */)) {
          if (!r2) continue;
          let e3 = r2.indexOf("=");
          if (-1 === e3) {
            t2.set(r2, "true");
            continue;
          }
          let [n2, s2] = [r2.slice(0, e3), r2.slice(e3 + 1)];
          try {
            t2.set(n2, decodeURIComponent(null != s2 ? s2 : "true"));
          } catch {
          }
        }
        return t2;
      }
      function l(e2) {
        if (!e2) return;
        let [[t2, r2], ...n2] = c(e2), { domain: s2, expires: o2, httponly: a2, maxage: i2, path: u2, samesite: l2, secure: p2, partitioned: h2, priority: y } = Object.fromEntries(n2.map(([e3, t3]) => [e3.toLowerCase().replace(/-/g, ""), t3]));
        {
          var g, m, _ = { name: t2, value: decodeURIComponent(r2), domain: s2, ...o2 && { expires: new Date(o2) }, ...a2 && { httpOnly: true }, ..."string" == typeof i2 && { maxAge: Number(i2) }, path: u2, ...l2 && { sameSite: f.includes(g = (g = l2).toLowerCase()) ? g : void 0 }, ...p2 && { secure: true }, ...y && { priority: d.includes(m = (m = y).toLowerCase()) ? m : void 0 }, ...h2 && { partitioned: true } };
          let e3 = {};
          for (let t3 in _) _[t3] && (e3[t3] = _[t3]);
          return e3;
        }
      }
      ((e2, t2) => {
        for (var r2 in t2) n(e2, r2, { get: t2[r2], enumerable: true });
      })(i, { RequestCookies: () => p, ResponseCookies: () => h, parseCookie: () => c, parseSetCookie: () => l, stringifyCookie: () => u }), t.exports = ((e2, t2, r2, i2) => {
        if (t2 && "object" == typeof t2 || "function" == typeof t2) for (let u2 of o(t2)) a.call(e2, u2) || u2 === r2 || n(e2, u2, { get: () => t2[u2], enumerable: !(i2 = s(t2, u2)) || i2.enumerable });
        return e2;
      })(n({}, "__esModule", { value: true }), i);
      var f = ["strict", "lax", "none"], d = ["low", "medium", "high"], p = class {
        constructor(e2) {
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          let t2 = e2.get("cookie");
          if (t2) for (let [e3, r2] of c(t2)) this._parsed.set(e3, { name: e3, value: r2 });
        }
        [Symbol.iterator]() {
          return this._parsed[Symbol.iterator]();
        }
        get size() {
          return this._parsed.size;
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed);
          if (!e2.length) return r2.map(([e3, t3]) => t3);
          let n2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter(([e3]) => e3 === n2).map(([e3, t3]) => t3);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2] = 1 === e2.length ? [e2[0].name, e2[0].value] : e2, n2 = this._parsed;
          return n2.set(t2, { name: t2, value: r2 }), this._headers.set("cookie", Array.from(n2).map(([e3, t3]) => u(t3)).join("; ")), this;
        }
        delete(e2) {
          let t2 = this._parsed, r2 = Array.isArray(e2) ? e2.map((e3) => t2.delete(e3)) : t2.delete(e2);
          return this._headers.set("cookie", Array.from(t2).map(([e3, t3]) => u(t3)).join("; ")), r2;
        }
        clear() {
          return this.delete(Array.from(this._parsed.keys())), this;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map((e2) => `${e2.name}=${encodeURIComponent(e2.value)}`).join("; ");
        }
      }, h = class {
        constructor(e2) {
          var t2, r2, n2;
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          let s2 = null != (n2 = null != (r2 = null == (t2 = e2.getSetCookie) ? void 0 : t2.call(e2)) ? r2 : e2.get("set-cookie")) ? n2 : [];
          for (let e3 of Array.isArray(s2) ? s2 : function(e4) {
            if (!e4) return [];
            var t3, r3, n3, s3, o2, a2 = [], i2 = 0;
            function u2() {
              for (; i2 < e4.length && /\s/.test(e4.charAt(i2)); ) i2 += 1;
              return i2 < e4.length;
            }
            for (; i2 < e4.length; ) {
              for (t3 = i2, o2 = false; u2(); ) if ("," === (r3 = e4.charAt(i2))) {
                for (n3 = i2, i2 += 1, u2(), s3 = i2; i2 < e4.length && "=" !== (r3 = e4.charAt(i2)) && ";" !== r3 && "," !== r3; ) i2 += 1;
                i2 < e4.length && "=" === e4.charAt(i2) ? (o2 = true, i2 = s3, a2.push(e4.substring(t3, n3)), t3 = i2) : i2 = n3 + 1;
              } else i2 += 1;
              (!o2 || i2 >= e4.length) && a2.push(e4.substring(t3, e4.length));
            }
            return a2;
          }(s2)) {
            let t3 = l(e3);
            t3 && this._parsed.set(t3.name, t3);
          }
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed.values());
          if (!e2.length) return r2;
          let n2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter((e3) => e3.name === n2);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2, n2] = 1 === e2.length ? [e2[0].name, e2[0].value, e2[0]] : e2, s2 = this._parsed;
          return s2.set(t2, function(e3 = { name: "", value: "" }) {
            return "number" == typeof e3.expires && (e3.expires = new Date(e3.expires)), e3.maxAge && (e3.expires = new Date(Date.now() + 1e3 * e3.maxAge)), (null === e3.path || void 0 === e3.path) && (e3.path = "/"), e3;
          }({ name: t2, value: r2, ...n2 })), function(e3, t3) {
            for (let [, r3] of (t3.delete("set-cookie"), e3)) {
              let e4 = u(r3);
              t3.append("set-cookie", e4);
            }
          }(s2, this._headers), this;
        }
        delete(...e2) {
          let [t2, r2] = "string" == typeof e2[0] ? [e2[0]] : [e2[0].name, e2[0]];
          return this.set({ ...r2, name: t2, value: "", expires: /* @__PURE__ */ new Date(0) });
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map(u).join("; ");
        }
      };
    }, 39e3, 17536, (e) => {
      "use strict";
      e.s([], 39e3), e.i(28042), e.s(["ReflectAdapter", () => t], 17536);
      class t {
        static get(e2, t2, r) {
          let n = Reflect.get(e2, t2, r);
          return "function" == typeof n ? n.bind(e2) : n;
        }
        static set(e2, t2, r, n) {
          return Reflect.set(e2, t2, r, n);
        }
        static has(e2, t2) {
          return Reflect.has(e2, t2);
        }
        static deleteProperty(e2, t2) {
          return Reflect.deleteProperty(e2, t2);
        }
      }
    }, 24628, (e) => {
      "use strict";
      e.s(["FLIGHT_HEADERS", () => s, "NEXT_HMR_REFRESH_HASH_COOKIE", () => n, "NEXT_REWRITTEN_PATH_HEADER", () => a, "NEXT_REWRITTEN_QUERY_HEADER", () => i, "NEXT_ROUTER_PREFETCH_HEADER", () => r, "NEXT_RSC_UNION_QUERY", () => o, "RSC_HEADER", () => t]);
      let t = "rsc", r = "next-router-prefetch", n = "__next_hmr_refresh_hash__", s = [t, "next-router-state-tree", r, "next-hmr-refresh", "next-router-segment-prefetch"], o = "_rsc", a = "x-nextjs-rewritten-path", i = "x-nextjs-rewritten-query";
    }, 48047, (e) => {
      "use strict";
      e.s(["HeadersAdapter", () => n]);
      var t = e.i(17536);
      class r extends Error {
        constructor() {
          super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
        }
        static callable() {
          throw new r();
        }
      }
      class n extends Headers {
        constructor(e2) {
          super(), this.headers = new Proxy(e2, { get(r2, n2, s) {
            if ("symbol" == typeof n2) return t.ReflectAdapter.get(r2, n2, s);
            let o = n2.toLowerCase(), a = Object.keys(e2).find((e3) => e3.toLowerCase() === o);
            if (void 0 !== a) return t.ReflectAdapter.get(r2, a, s);
          }, set(r2, n2, s, o) {
            if ("symbol" == typeof n2) return t.ReflectAdapter.set(r2, n2, s, o);
            let a = n2.toLowerCase(), i = Object.keys(e2).find((e3) => e3.toLowerCase() === a);
            return t.ReflectAdapter.set(r2, i ?? n2, s, o);
          }, has(r2, n2) {
            if ("symbol" == typeof n2) return t.ReflectAdapter.has(r2, n2);
            let s = n2.toLowerCase(), o = Object.keys(e2).find((e3) => e3.toLowerCase() === s);
            return void 0 !== o && t.ReflectAdapter.has(r2, o);
          }, deleteProperty(r2, n2) {
            if ("symbol" == typeof n2) return t.ReflectAdapter.deleteProperty(r2, n2);
            let s = n2.toLowerCase(), o = Object.keys(e2).find((e3) => e3.toLowerCase() === s);
            return void 0 === o || t.ReflectAdapter.deleteProperty(r2, o);
          } });
        }
        static seal(e2) {
          return new Proxy(e2, { get(e3, n2, s) {
            switch (n2) {
              case "append":
              case "delete":
              case "set":
                return r.callable;
              default:
                return t.ReflectAdapter.get(e3, n2, s);
            }
          } });
        }
        merge(e2) {
          return Array.isArray(e2) ? e2.join(", ") : e2;
        }
        static from(e2) {
          return e2 instanceof Headers ? e2 : new n(e2);
        }
        append(e2, t2) {
          let r2 = this.headers[e2];
          "string" == typeof r2 ? this.headers[e2] = [r2, t2] : Array.isArray(r2) ? r2.push(t2) : this.headers[e2] = t2;
        }
        delete(e2) {
          delete this.headers[e2];
        }
        get(e2) {
          let t2 = this.headers[e2];
          return void 0 !== t2 ? this.merge(t2) : null;
        }
        has(e2) {
          return void 0 !== this.headers[e2];
        }
        set(e2, t2) {
          this.headers[e2] = t2;
        }
        forEach(e2, t2) {
          for (let [r2, n2] of this.entries()) e2.call(t2, n2, r2, this);
        }
        *entries() {
          for (let e2 of Object.keys(this.headers)) {
            let t2 = e2.toLowerCase(), r2 = this.get(t2);
            yield [t2, r2];
          }
        }
        *keys() {
          for (let e2 of Object.keys(this.headers)) {
            let t2 = e2.toLowerCase();
            yield t2;
          }
        }
        *values() {
          for (let e2 of Object.keys(this.headers)) {
            let t2 = this.get(e2);
            yield t2;
          }
        }
        [Symbol.iterator]() {
          return this.entries();
        }
      }
    }, 90044, (e) => {
      "use strict";
      e.s(["bindSnapshot", () => o, "createAsyncLocalStorage", () => s, "createSnapshot", () => a]);
      let t = Object.defineProperty(Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"), "__NEXT_ERROR_CODE", { value: "E504", enumerable: false, configurable: true });
      class r {
        disable() {
          throw t;
        }
        getStore() {
        }
        run() {
          throw t;
        }
        exit() {
          throw t;
        }
        enterWith() {
          throw t;
        }
        static bind(e2) {
          return e2;
        }
      }
      let n = "undefined" != typeof globalThis && globalThis.AsyncLocalStorage;
      function s() {
        return n ? new n() : new r();
      }
      function o(e2) {
        return n ? n.bind(e2) : r.bind(e2);
      }
      function a() {
        return n ? n.snapshot() : function(e2, ...t2) {
          return e2(...t2);
        };
      }
    }, 7754, 90460, 9939, (e) => {
      "use strict";
      e.s([], 7754);
      var t = e.i(90044);
      let r = (0, t.createAsyncLocalStorage)();
      e.s(["workAsyncStorage", () => r], 90460), e.s(["workUnitAsyncStorageInstance", () => n], 9939);
      let n = (0, t.createAsyncLocalStorage)();
    }, 53835, 25753, 82453, (e) => {
      "use strict";
      e.s(["getDraftModeProviderForCacheScope", () => s, "getRuntimeStagePromise", () => o, "throwForMissingRequestStore", () => n], 53835);
      var t = e.i(9939);
      e.i(24628), e.s(["InvariantError", () => r], 25753);
      class r extends Error {
        constructor(e2, t2) {
          super("Invariant: " + (e2.endsWith(".") ? e2 : e2 + ".") + " This is a bug in Next.js.", t2), this.name = "InvariantError";
        }
      }
      function n(e2) {
        throw Object.defineProperty(Error(`\`${e2}\` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`), "__NEXT_ERROR_CODE", { value: "E251", enumerable: false, configurable: true });
      }
      function s(e2, t2) {
        if (e2.isDraftMode) switch (t2.type) {
          case "cache":
          case "private-cache":
          case "unstable-cache":
          case "prerender-runtime":
          case "request":
            return t2.draftMode;
        }
      }
      function o(e2) {
        switch (e2.type) {
          case "prerender-runtime":
          case "private-cache":
            return e2.runtimeStagePromise;
          case "prerender":
          case "prerender-client":
          case "prerender-ppr":
          case "prerender-legacy":
          case "request":
          case "cache":
          case "unstable-cache":
            return null;
          default:
            return e2;
        }
      }
      e.s(["workUnitAsyncStorage", () => a.workUnitAsyncStorageInstance], 82453);
      var a = t;
    }, 51564, (e) => {
      "use strict";
      function t(e2) {
        return "object" == typeof e2 && null !== e2 && "digest" in e2 && e2.digest === r;
      }
      e.s(["isHangingPromiseRejectionError", () => t, "makeDevtoolsIOAwarePromise", () => i, "makeHangingPromise", () => o]);
      let r = "HANGING_PROMISE_REJECTION";
      class n extends Error {
        constructor(e2, t2) {
          super(`During prerendering, ${t2} rejects when the prerender is complete. Typically these errors are handled by React but if you move ${t2} to a different context by using \`setTimeout\`, \`after\`, or similar functions you may observe this error and you should handle it in that context. This occurred at route "${e2}".`), this.route = e2, this.expression = t2, this.digest = r;
        }
      }
      let s = /* @__PURE__ */ new WeakMap();
      function o(e2, t2, r2) {
        if (e2.aborted) return Promise.reject(new n(t2, r2));
        {
          let o2 = new Promise((o3, a2) => {
            let i2 = a2.bind(null, new n(t2, r2)), u = s.get(e2);
            if (u) u.push(i2);
            else {
              let t3 = [i2];
              s.set(e2, t3), e2.addEventListener("abort", () => {
                for (let e3 = 0; e3 < t3.length; e3++) t3[e3]();
              }, { once: true });
            }
          });
          return o2.catch(a), o2;
        }
      }
      function a() {
      }
      function i(e2) {
        return new Promise((t2) => {
          setTimeout(() => {
            t2(e2);
          }, 0);
        });
      }
    }, 81828, (e) => {
      "use strict";
      e.s(["BailoutToCSRError", () => r, "isBailoutToCSRError", () => n]);
      let t = "BAILOUT_TO_CLIENT_SIDE_RENDERING";
      class r extends Error {
        constructor(e2) {
          super("Bail out to client-side rendering: " + e2), this.reason = e2, this.digest = t;
        }
      }
      function n(e2) {
        return "object" == typeof e2 && null !== e2 && "digest" in e2 && e2.digest === t;
      }
    }, 8946, (e, t, r) => {
      "use strict";
      var n = { H: null, A: null };
      function s(e2) {
        var t2 = "https://react.dev/errors/" + e2;
        if (1 < arguments.length) {
          t2 += "?args[]=" + encodeURIComponent(arguments[1]);
          for (var r2 = 2; r2 < arguments.length; r2++) t2 += "&args[]=" + encodeURIComponent(arguments[r2]);
        }
        return "Minified React error #" + e2 + "; visit " + t2 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      var o = Array.isArray;
      function a() {
      }
      var i = Symbol.for("react.transitional.element"), u = Symbol.for("react.portal"), c = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), f = Symbol.for("react.profiler"), d = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), h = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), g = Symbol.iterator, m = Object.prototype.hasOwnProperty, _ = Object.assign;
      function b(e2, t2, r2) {
        var n2 = r2.ref;
        return { $$typeof: i, type: e2, key: t2, ref: void 0 !== n2 ? n2 : null, props: r2 };
      }
      function E(e2) {
        return "object" == typeof e2 && null !== e2 && e2.$$typeof === i;
      }
      var R = /\/+/g;
      function v(e2, t2) {
        var r2, n2;
        return "object" == typeof e2 && null !== e2 && null != e2.key ? (r2 = "" + e2.key, n2 = { "=": "=0", ":": "=2" }, "$" + r2.replace(/[=:]/g, function(e3) {
          return n2[e3];
        })) : t2.toString(36);
      }
      function A(e2, t2, r2) {
        if (null == e2) return e2;
        var n2 = [], c2 = 0;
        return !function e3(t3, r3, n3, c3, l2) {
          var f2, d2, p2, h2 = typeof t3;
          ("undefined" === h2 || "boolean" === h2) && (t3 = null);
          var m2 = false;
          if (null === t3) m2 = true;
          else switch (h2) {
            case "bigint":
            case "string":
            case "number":
              m2 = true;
              break;
            case "object":
              switch (t3.$$typeof) {
                case i:
                case u:
                  m2 = true;
                  break;
                case y:
                  return e3((m2 = t3._init)(t3._payload), r3, n3, c3, l2);
              }
          }
          if (m2) return l2 = l2(t3), m2 = "" === c3 ? "." + v(t3, 0) : c3, o(l2) ? (n3 = "", null != m2 && (n3 = m2.replace(R, "$&/") + "/"), e3(l2, r3, n3, "", function(e4) {
            return e4;
          })) : null != l2 && (E(l2) && (f2 = l2, d2 = n3 + (null == l2.key || t3 && t3.key === l2.key ? "" : ("" + l2.key).replace(R, "$&/") + "/") + m2, l2 = b(f2.type, d2, f2.props)), r3.push(l2)), 1;
          m2 = 0;
          var _2 = "" === c3 ? "." : c3 + ":";
          if (o(t3)) for (var A2 = 0; A2 < t3.length; A2++) h2 = _2 + v(c3 = t3[A2], A2), m2 += e3(c3, r3, n3, h2, l2);
          else if ("function" == typeof (A2 = null === (p2 = t3) || "object" != typeof p2 ? null : "function" == typeof (p2 = g && p2[g] || p2["@@iterator"]) ? p2 : null)) for (t3 = A2.call(t3), A2 = 0; !(c3 = t3.next()).done; ) h2 = _2 + v(c3 = c3.value, A2++), m2 += e3(c3, r3, n3, h2, l2);
          else if ("object" === h2) {
            if ("function" == typeof t3.then) return e3(function(e4) {
              switch (e4.status) {
                case "fulfilled":
                  return e4.value;
                case "rejected":
                  throw e4.reason;
                default:
                  switch ("string" == typeof e4.status ? e4.then(a, a) : (e4.status = "pending", e4.then(function(t4) {
                    "pending" === e4.status && (e4.status = "fulfilled", e4.value = t4);
                  }, function(t4) {
                    "pending" === e4.status && (e4.status = "rejected", e4.reason = t4);
                  })), e4.status) {
                    case "fulfilled":
                      return e4.value;
                    case "rejected":
                      throw e4.reason;
                  }
              }
              throw e4;
            }(t3), r3, n3, c3, l2);
            throw Error(s(31, "[object Object]" === (r3 = String(t3)) ? "object with keys {" + Object.keys(t3).join(", ") + "}" : r3));
          }
          return m2;
        }(e2, n2, "", "", function(e3) {
          return t2.call(r2, e3, c2++);
        }), n2;
      }
      function w(e2) {
        if (-1 === e2._status) {
          var t2 = e2._result;
          (t2 = t2()).then(function(t3) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 1, e2._result = t3);
          }, function(t3) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 2, e2._result = t3);
          }), -1 === e2._status && (e2._status = 0, e2._result = t2);
        }
        if (1 === e2._status) return e2._result.default;
        throw e2._result;
      }
      function S() {
        return /* @__PURE__ */ new WeakMap();
      }
      function k() {
        return { s: 0, v: void 0, o: null, p: null };
      }
      r.Children = { map: A, forEach: function(e2, t2, r2) {
        A(e2, function() {
          t2.apply(this, arguments);
        }, r2);
      }, count: function(e2) {
        var t2 = 0;
        return A(e2, function() {
          t2++;
        }), t2;
      }, toArray: function(e2) {
        return A(e2, function(e3) {
          return e3;
        }) || [];
      }, only: function(e2) {
        if (!E(e2)) throw Error(s(143));
        return e2;
      } }, r.Fragment = c, r.Profiler = f, r.StrictMode = l, r.Suspense = p, r.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = n, r.cache = function(e2) {
        return function() {
          var t2 = n.A;
          if (!t2) return e2.apply(null, arguments);
          var r2 = t2.getCacheForType(S);
          void 0 === (t2 = r2.get(e2)) && (t2 = k(), r2.set(e2, t2)), r2 = 0;
          for (var s2 = arguments.length; r2 < s2; r2++) {
            var o2 = arguments[r2];
            if ("function" == typeof o2 || "object" == typeof o2 && null !== o2) {
              var a2 = t2.o;
              null === a2 && (t2.o = a2 = /* @__PURE__ */ new WeakMap()), void 0 === (t2 = a2.get(o2)) && (t2 = k(), a2.set(o2, t2));
            } else null === (a2 = t2.p) && (t2.p = a2 = /* @__PURE__ */ new Map()), void 0 === (t2 = a2.get(o2)) && (t2 = k(), a2.set(o2, t2));
          }
          if (1 === t2.s) return t2.v;
          if (2 === t2.s) throw t2.v;
          try {
            var i2 = e2.apply(null, arguments);
            return (r2 = t2).s = 1, r2.v = i2;
          } catch (e3) {
            throw (i2 = t2).s = 2, i2.v = e3, e3;
          }
        };
      }, r.cacheSignal = function() {
        var e2 = n.A;
        return e2 ? e2.cacheSignal() : null;
      }, r.captureOwnerStack = function() {
        return null;
      }, r.cloneElement = function(e2, t2, r2) {
        if (null == e2) throw Error(s(267, e2));
        var n2 = _({}, e2.props), o2 = e2.key;
        if (null != t2) for (a2 in void 0 !== t2.key && (o2 = "" + t2.key), t2) m.call(t2, a2) && "key" !== a2 && "__self" !== a2 && "__source" !== a2 && ("ref" !== a2 || void 0 !== t2.ref) && (n2[a2] = t2[a2]);
        var a2 = arguments.length - 2;
        if (1 === a2) n2.children = r2;
        else if (1 < a2) {
          for (var i2 = Array(a2), u2 = 0; u2 < a2; u2++) i2[u2] = arguments[u2 + 2];
          n2.children = i2;
        }
        return b(e2.type, o2, n2);
      }, r.createElement = function(e2, t2, r2) {
        var n2, s2 = {}, o2 = null;
        if (null != t2) for (n2 in void 0 !== t2.key && (o2 = "" + t2.key), t2) m.call(t2, n2) && "key" !== n2 && "__self" !== n2 && "__source" !== n2 && (s2[n2] = t2[n2]);
        var a2 = arguments.length - 2;
        if (1 === a2) s2.children = r2;
        else if (1 < a2) {
          for (var i2 = Array(a2), u2 = 0; u2 < a2; u2++) i2[u2] = arguments[u2 + 2];
          s2.children = i2;
        }
        if (e2 && e2.defaultProps) for (n2 in a2 = e2.defaultProps) void 0 === s2[n2] && (s2[n2] = a2[n2]);
        return b(e2, o2, s2);
      }, r.createRef = function() {
        return { current: null };
      }, r.forwardRef = function(e2) {
        return { $$typeof: d, render: e2 };
      }, r.isValidElement = E, r.lazy = function(e2) {
        return { $$typeof: y, _payload: { _status: -1, _result: e2 }, _init: w };
      }, r.memo = function(e2, t2) {
        return { $$typeof: h, type: e2, compare: void 0 === t2 ? null : t2 };
      }, r.use = function(e2) {
        return n.H.use(e2);
      }, r.useCallback = function(e2, t2) {
        return n.H.useCallback(e2, t2);
      }, r.useDebugValue = function() {
      }, r.useId = function() {
        return n.H.useId();
      }, r.useMemo = function(e2, t2) {
        return n.H.useMemo(e2, t2);
      }, r.version = "19.2.0-canary-0bdb9206-20250818";
    }, 40049, (e, t, r) => {
      "use strict";
      t.exports = e.r(8946);
    }, 18368, 80082, (e) => {
      "use strict";
      e.s(["DynamicServerError", () => r, "isDynamicServerError", () => n], 18368);
      let t = "DYNAMIC_SERVER_USAGE";
      class r extends Error {
        constructor(e2) {
          super("Dynamic server usage: " + e2), this.description = e2, this.digest = t;
        }
      }
      function n(e2) {
        return "object" == typeof e2 && null !== e2 && "digest" in e2 && "string" == typeof e2.digest && e2.digest === t;
      }
      e.s(["StaticGenBailoutError", () => s], 80082);
      class s extends Error {
        constructor(...e2) {
          super(...e2), this.code = "NEXT_STATIC_GEN_BAILOUT";
        }
      }
    }, 21654, 46025, (e) => {
      "use strict";
      e.s(["METADATA_BOUNDARY_NAME", () => t, "OUTLET_BOUNDARY_NAME", () => n, "ROOT_LAYOUT_BOUNDARY_NAME", () => s, "VIEWPORT_BOUNDARY_NAME", () => r], 21654);
      let t = "__next_metadata_boundary__", r = "__next_viewport_boundary__", n = "__next_outlet_boundary__", s = "__next_root_layout_boundary__";
      e.s(["scheduleOnNextTick", () => o], 46025);
      let o = (e2) => {
        Promise.resolve().then(() => {
          setTimeout(e2, 0);
        });
      };
    }, 63072, (e) => {
      "use strict";
      e.s(["abortAndThrowOnSynchronousRequestDataAccess", () => i, "delayUntilRuntimeStage", () => h, "isDynamicPostpone", () => f, "postponeWithTracking", () => c, "throwToInterruptStaticGeneration", () => o, "trackDynamicDataInDynamicRender", () => a, "trackSynchronousRequestDataAccessInDev", () => u]);
      var t = e.i(40049), r = e.i(18368);
      e.i(80082), e.i(53835), e.i(82453), e.i(7754), e.i(90460), e.i(51564);
      var n = e.i(21654);
      e.i(46025), e.i(81828), e.i(25753);
      let s = "function" == typeof t.default.unstable_postpone;
      function o(e2, t2, n2) {
        let s2 = Object.defineProperty(new r.DynamicServerError(`Route ${t2.route} couldn't be rendered statically because it used \`${e2}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", { value: "E558", enumerable: false, configurable: true });
        throw n2.revalidate = 0, t2.dynamicUsageDescription = e2, t2.dynamicUsageStack = s2.stack, s2;
      }
      function a(e2) {
        switch (e2.type) {
          case "cache":
          case "unstable-cache":
          case "private-cache":
            return;
        }
      }
      function i(e2, t2, r2, n2) {
        if (false === n2.controller.signal.aborted) {
          let s2 = p(`Route ${e2} needs to bail out of prerendering at this point because it used ${t2}.`);
          n2.controller.abort(s2);
          let o2 = n2.dynamicTracking;
          o2 && o2.dynamicAccesses.push({ stack: o2.isDebugDynamicAccesses ? Error().stack : void 0, expression: t2 });
          let a2 = n2.dynamicTracking;
          a2 && null === a2.syncDynamicErrorWithStack && (a2.syncDynamicErrorWithStack = r2);
        }
        throw p(`Route ${e2} needs to bail out of prerendering at this point because it used ${t2}.`);
      }
      let u = function(e2) {
        e2.prerenderPhase = false;
      };
      function c(e2, r2, n2) {
        (function() {
          if (!s) throw Object.defineProperty(Error("Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E224", enumerable: false, configurable: true });
        })(), n2 && n2.dynamicAccesses.push({ stack: n2.isDebugDynamicAccesses ? Error().stack : void 0, expression: r2 }), t.default.unstable_postpone(l(e2, r2));
      }
      function l(e2, t2) {
        return `Route ${e2} needs to bail out of prerendering at this point because it used ${t2}. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
      }
      function f(e2) {
        return "object" == typeof e2 && null !== e2 && "string" == typeof e2.message && d(e2.message);
      }
      function d(e2) {
        return e2.includes("needs to bail out of prerendering at this point because it used") && e2.includes("Learn more: https://nextjs.org/docs/messages/ppr-caught-error");
      }
      if (false === d(l("%%%", "^^^"))) throw Object.defineProperty(Error("Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E296", enumerable: false, configurable: true });
      function p(e2) {
        let t2 = Object.defineProperty(Error(e2), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        return t2.digest = "NEXT_PRERENDER_INTERRUPTED", t2;
      }
      function h(e2, t2) {
        return e2.runtimeStagePromise ? e2.runtimeStagePromise.then(() => t2) : t2;
      }
      RegExp(`\\n\\s+at Suspense \\(<anonymous>\\)(?:(?!\\n\\s+at (?:body|div|main|section|article|aside|header|footer|nav|form|p|span|h1|h2|h3|h4|h5|h6) \\(<anonymous>\\))[\\s\\S])*?\\n\\s+at ${n.ROOT_LAYOUT_BOUNDARY_NAME} \\([^\\n]*\\)`), RegExp(`\\n\\s+at ${n.METADATA_BOUNDARY_NAME}[\\n\\s]`), RegExp(`\\n\\s+at ${n.VIEWPORT_BOUNDARY_NAME}[\\n\\s]`), RegExp(`\\n\\s+at ${n.OUTLET_BOUNDARY_NAME}[\\n\\s]`);
    }, 53065, 44789, 69487, 65179, (e) => {
      "use strict";
      e.s(["MutableRequestCookiesAdapter", () => i, "RequestCookiesAdapter", () => o, "areCookiesMutableInCurrentPhase", () => c, "createCookiesWithMutableAccessCheck", () => u, "responseCookiesToRequestCookies", () => f], 53065), e.i(39e3);
      var t = e.i(28042), r = e.i(17536);
      e.i(7754);
      var n = e.i(90460);
      class s extends Error {
        constructor() {
          super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options");
        }
        static callable() {
          throw new s();
        }
      }
      class o {
        static seal(e2) {
          return new Proxy(e2, { get(e3, t2, n2) {
            switch (t2) {
              case "clear":
              case "delete":
              case "set":
                return s.callable;
              default:
                return r.ReflectAdapter.get(e3, t2, n2);
            }
          } });
        }
      }
      let a = Symbol.for("next.mutated.cookies");
      class i {
        static wrap(e2, s2) {
          let o2 = new t.ResponseCookies(new Headers());
          for (let t2 of e2.getAll()) o2.set(t2);
          let i2 = [], u2 = /* @__PURE__ */ new Set(), c2 = () => {
            let e3 = n.workAsyncStorage.getStore();
            if (e3 && (e3.pathWasRevalidated = true), i2 = o2.getAll().filter((e4) => u2.has(e4.name)), s2) {
              let e4 = [];
              for (let r2 of i2) {
                let n2 = new t.ResponseCookies(new Headers());
                n2.set(r2), e4.push(n2.toString());
              }
              s2(e4);
            }
          }, l2 = new Proxy(o2, { get(e3, t2, n2) {
            switch (t2) {
              case a:
                return i2;
              case "delete":
                return function(...t3) {
                  u2.add("string" == typeof t3[0] ? t3[0] : t3[0].name);
                  try {
                    return e3.delete(...t3), l2;
                  } finally {
                    c2();
                  }
                };
              case "set":
                return function(...t3) {
                  u2.add("string" == typeof t3[0] ? t3[0] : t3[0].name);
                  try {
                    return e3.set(...t3), l2;
                  } finally {
                    c2();
                  }
                };
              default:
                return r.ReflectAdapter.get(e3, t2, n2);
            }
          } });
          return l2;
        }
      }
      function u(e2) {
        let t2 = new Proxy(e2.mutableCookies, { get(n2, s2, o2) {
          switch (s2) {
            case "delete":
              return function(...r2) {
                return l(e2, "cookies().delete"), n2.delete(...r2), t2;
              };
            case "set":
              return function(...r2) {
                return l(e2, "cookies().set"), n2.set(...r2), t2;
              };
            default:
              return r.ReflectAdapter.get(n2, s2, o2);
          }
        } });
        return t2;
      }
      function c(e2) {
        return "action" === e2.phase;
      }
      function l(e2, t2) {
        if (!c(e2)) throw new s();
      }
      function f(e2) {
        let r2 = new t.RequestCookies(new Headers());
        for (let t2 of e2.getAll()) r2.set(t2);
        return r2;
      }
      e.s(["isRequestAPICallableInsideAfter", () => p], 65179), e.i(80082), e.s([], 44789);
      let d = (0, e.i(90044).createAsyncLocalStorage)();
      function p() {
        let e2 = d.getStore();
        return (null == e2 ? void 0 : e2.rootTaskSpawnPhase) === "action";
      }
      e.s(["afterTaskAsyncStorage", () => d], 69487);
    }]);
  }
});

// .next/server/edge/chunks/turbopack-edge-wrapper_5652c305.js
var require_turbopack_edge_wrapper_5652c305 = __commonJS({
  ".next/server/edge/chunks/turbopack-edge-wrapper_5652c305.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/turbopack-edge-wrapper_5652c305.js", { otherChunks: ["chunks/_9dc8116b._.js", "chunks/node_modules_next_dist_esm_api_headers_95aeb203.js", "chunks/[root-of-the-server]__f0c622ec._.js", "chunks/node_modules_next_dist_f455c4eb._.js"], runtimeModuleIds: [32442] }]), (() => {
      let e;
      if (!Array.isArray(globalThis.TURBOPACK)) return;
      let t = /* @__PURE__ */ new WeakMap();
      function n(e2, t2) {
        this.m = e2, this.e = t2;
      }
      let r = n.prototype, o = Object.prototype.hasOwnProperty, u = "undefined" != typeof Symbol && Symbol.toStringTag;
      function i(e2, t2, n2) {
        o.call(e2, t2) || Object.defineProperty(e2, t2, n2);
      }
      function l(e2, t2) {
        let n2 = e2[t2];
        return n2 || (n2 = s(t2), e2[t2] = n2), n2;
      }
      function s(e2) {
        return { exports: {}, error: void 0, id: e2, namespaceObject: void 0 };
      }
      function a(e2, t2) {
        i(e2, "__esModule", { value: true }), u && i(e2, u, { value: "Module" });
        let n2 = 0;
        for (; n2 < t2.length; ) {
          let r2 = t2[n2++], o2 = t2[n2++];
          "function" == typeof t2[n2] ? i(e2, r2, { get: o2, set: t2[n2++], enumerable: true }) : i(e2, r2, { get: o2, enumerable: true });
        }
        Object.seal(e2);
      }
      r.s = function(e2, t2) {
        let n2, r2;
        null != t2 ? r2 = (n2 = l(this.c, t2)).exports : (n2 = this.m, r2 = this.e), n2.namespaceObject = r2, a(r2, e2);
      }, r.j = function(e2, n2) {
        var r2, u2;
        let i2, s2, a2;
        null != n2 ? s2 = (i2 = l(this.c, n2)).exports : (i2 = this.m, s2 = this.e);
        let c2 = (r2 = i2, u2 = s2, (a2 = t.get(r2)) || (t.set(r2, a2 = []), r2.exports = r2.namespaceObject = new Proxy(u2, { get(e3, t2) {
          if (o.call(e3, t2) || "default" === t2 || "__esModule" === t2) return Reflect.get(e3, t2);
          for (let e4 of a2) {
            let n3 = Reflect.get(e4, t2);
            if (void 0 !== n3) return n3;
          }
        }, ownKeys(e3) {
          let t2 = Reflect.ownKeys(e3);
          for (let e4 of a2) for (let n3 of Reflect.ownKeys(e4)) "default" === n3 || t2.includes(n3) || t2.push(n3);
          return t2;
        } })), a2);
        "object" == typeof e2 && null !== e2 && c2.push(e2);
      }, r.v = function(e2, t2) {
        (null != t2 ? l(this.c, t2) : this.m).exports = e2;
      }, r.n = function(e2, t2) {
        let n2;
        (n2 = null != t2 ? l(this.c, t2) : this.m).exports = n2.namespaceObject = e2;
      };
      let c = Object.getPrototypeOf ? (e2) => Object.getPrototypeOf(e2) : (e2) => e2.__proto__, f = [null, c({}), c([]), c(c)];
      function d(e2, t2, n2) {
        let r2 = [], o2 = -1;
        for (let t3 = e2; ("object" == typeof t3 || "function" == typeof t3) && !f.includes(t3); t3 = c(t3)) for (let n3 of Object.getOwnPropertyNames(t3)) r2.push(n3, /* @__PURE__ */ function(e3, t4) {
          return () => e3[t4];
        }(e2, n3)), -1 === o2 && "default" === n3 && (o2 = r2.length - 1);
        return n2 && o2 >= 0 || (o2 >= 0 ? r2[o2] = () => e2 : r2.push("default", () => e2)), a(t2, r2), t2;
      }
      function h(e2) {
        return "function" == typeof e2 ? function(...t2) {
          return e2.apply(this, t2);
        } : /* @__PURE__ */ Object.create(null);
      }
      function p(e2) {
        return "string" == typeof e2 ? e2 : e2.path;
      }
      function m() {
        let e2, t2;
        return { promise: new Promise((n2, r2) => {
          t2 = r2, e2 = n2;
        }), resolve: e2, reject: t2 };
      }
      r.i = function(e2) {
        let t2 = E(e2, this.m);
        if (t2.namespaceObject) return t2.namespaceObject;
        let n2 = t2.exports;
        return t2.namespaceObject = d(n2, h(n2), n2 && n2.__esModule);
      }, r.A = function(e2) {
        return this.r(e2)(this.i.bind(this));
      }, r.t = "function" == typeof __require ? __require : function() {
        throw Error("Unexpected use of runtime require");
      }, r.r = function(e2) {
        return E(e2, this.m).exports;
      }, r.f = function(e2) {
        function t2(t3) {
          if (o.call(e2, t3)) return e2[t3].module();
          let n2 = Error(`Cannot find module '${t3}'`);
          throw n2.code = "MODULE_NOT_FOUND", n2;
        }
        return t2.keys = () => Object.keys(e2), t2.resolve = (t3) => {
          if (o.call(e2, t3)) return e2[t3].id();
          let n2 = Error(`Cannot find module '${t3}'`);
          throw n2.code = "MODULE_NOT_FOUND", n2;
        }, t2.import = async (e3) => await t2(e3), t2;
      };
      let b = Symbol("turbopack queues"), y = Symbol("turbopack exports"), O = Symbol("turbopack error");
      function _(e2) {
        e2 && 1 !== e2.status && (e2.status = 1, e2.forEach((e3) => e3.queueCount--), e2.forEach((e3) => e3.queueCount-- ? e3.queueCount++ : e3()));
      }
      r.a = function(e2, t2) {
        let n2 = this.m, r2 = t2 ? Object.assign([], { status: -1 }) : void 0, o2 = /* @__PURE__ */ new Set(), { resolve: u2, reject: i2, promise: l2 } = m(), s2 = Object.assign(l2, { [y]: n2.exports, [b]: (e3) => {
          r2 && e3(r2), o2.forEach(e3), s2.catch(() => {
          });
        } }), a2 = { get: () => s2, set(e3) {
          e3 !== s2 && (s2[y] = e3);
        } };
        Object.defineProperty(n2, "exports", a2), Object.defineProperty(n2, "namespaceObject", a2), e2(function(e3) {
          let t3 = e3.map((e4) => {
            if (null !== e4 && "object" == typeof e4) {
              if (b in e4) return e4;
              if (null != e4 && "object" == typeof e4 && "then" in e4 && "function" == typeof e4.then) {
                let t4 = Object.assign([], { status: 0 }), n4 = { [y]: {}, [b]: (e5) => e5(t4) };
                return e4.then((e5) => {
                  n4[y] = e5, _(t4);
                }, (e5) => {
                  n4[O] = e5, _(t4);
                }), n4;
              }
            }
            return { [y]: e4, [b]: () => {
            } };
          }), n3 = () => t3.map((e4) => {
            if (e4[O]) throw e4[O];
            return e4[y];
          }), { promise: u3, resolve: i3 } = m(), l3 = Object.assign(() => i3(n3), { queueCount: 0 });
          function s3(e4) {
            e4 !== r2 && !o2.has(e4) && (o2.add(e4), e4 && 0 === e4.status && (l3.queueCount++, e4.push(l3)));
          }
          return t3.map((e4) => e4[b](s3)), l3.queueCount ? u3 : n3();
        }, function(e3) {
          e3 ? i2(s2[O] = e3) : u2(s2[y]), _(r2);
        }), r2 && -1 === r2.status && (r2.status = 0);
      };
      let g = function(e2) {
        let t2 = new URL(e2, "x:/"), n2 = {};
        for (let e3 in t2) n2[e3] = t2[e3];
        for (let t3 in n2.href = e2, n2.pathname = e2.replace(/[?#].*/, ""), n2.origin = n2.protocol = "", n2.toString = n2.toJSON = (...t4) => e2, n2) Object.defineProperty(this, t3, { enumerable: true, configurable: true, value: n2[t3] });
      };
      function w(e2, t2) {
        throw Error(`Invariant: ${t2(e2)}`);
      }
      g.prototype = URL.prototype, r.U = g, r.z = function(e2) {
        throw Error("dynamic usage of require is not supported");
      }, r.g = globalThis;
      let j = n.prototype;
      var C = function(e2) {
        return e2[e2.Runtime = 0] = "Runtime", e2[e2.Parent = 1] = "Parent", e2[e2.Update = 2] = "Update", e2;
      }(C || {});
      let k = /* @__PURE__ */ new Map();
      r.M = k;
      let R = /* @__PURE__ */ new Map(), U = /* @__PURE__ */ new Map();
      async function P(e2, t2, n2) {
        let r2;
        if ("string" == typeof n2) return M(e2, t2, $(n2));
        let o2 = n2.included || [], u2 = o2.map((e3) => !!k.has(e3) || R.get(e3));
        if (u2.length > 0 && u2.every((e3) => e3)) return void await Promise.all(u2);
        let i2 = n2.moduleChunks || [], l2 = i2.map((e3) => U.get(e3)).filter((e3) => e3);
        if (l2.length > 0) {
          if (l2.length === i2.length) return void await Promise.all(l2);
          let n3 = /* @__PURE__ */ new Set();
          for (let e3 of i2) U.has(e3) || n3.add(e3);
          for (let r3 of n3) {
            let n4 = M(e2, t2, $(r3));
            U.set(r3, n4), l2.push(n4);
          }
          r2 = Promise.all(l2);
        } else {
          for (let o3 of (r2 = M(e2, t2, $(n2.path)), i2)) U.has(o3) || U.set(o3, r2);
        }
        for (let e3 of o2) R.has(e3) || R.set(e3, r2);
        await r2;
      }
      j.l = function(e2) {
        return P(1, this.m.id, e2);
      };
      let v = Promise.resolve(void 0), T = /* @__PURE__ */ new WeakMap();
      function M(t2, n2, r2) {
        let o2 = e.loadChunkCached(t2, r2), u2 = T.get(o2);
        if (void 0 === u2) {
          let e2 = T.set.bind(T, o2, v);
          u2 = o2.then(e2).catch((e3) => {
            let o3;
            switch (t2) {
              case 0:
                o3 = `as a runtime dependency of chunk ${n2}`;
                break;
              case 1:
                o3 = `from module ${n2}`;
                break;
              case 2:
                o3 = "from an HMR update";
                break;
              default:
                w(t2, (e4) => `Unknown source type: ${e4}`);
            }
            throw Error(`Failed to load chunk ${r2} ${o3}${e3 ? `: ${e3}` : ""}`, e3 ? { cause: e3 } : void 0);
          }), T.set(o2, u2);
        }
        return u2;
      }
      function $(e2) {
        return `${e2.split("/").map((e3) => encodeURIComponent(e3)).join("/")}`;
      }
      j.L = function(e2) {
        return M(1, this.m.id, e2);
      }, j.R = function(e2) {
        let t2 = this.r(e2);
        return t2?.default ?? t2;
      }, j.P = function(e2) {
        return `/ROOT/${e2 ?? ""}`;
      }, j.b = function(e2) {
        let t2 = new Blob([`self.TURBOPACK_WORKER_LOCATION = ${JSON.stringify(location.origin)};
self.TURBOPACK_NEXT_CHUNK_URLS = ${JSON.stringify(e2.reverse().map($), null, 2)};
importScripts(...self.TURBOPACK_NEXT_CHUNK_URLS.map(c => self.TURBOPACK_WORKER_LOCATION + c).reverse());`], { type: "text/javascript" });
        return URL.createObjectURL(t2);
      };
      let x = /\.js(?:\?[^#]*)?(?:#.*)?$/;
      r.w = function(t2, n2, r2) {
        return e.loadWebAssembly(1, this.m.id, t2, n2, r2);
      }, r.u = function(t2, n2) {
        return e.loadWebAssemblyModule(1, this.m.id, t2, n2);
      };
      let A = {};
      r.c = A;
      let E = (e2, t2) => {
        let n2 = A[e2];
        if (n2) {
          if (n2.error) throw n2.error;
          return n2;
        }
        return K(e2, C.Parent, t2.id);
      };
      function K(e2, t2, r2) {
        let o2 = k.get(e2);
        "function" != typeof o2 && function(e3, t3, n2) {
          let r3;
          switch (t3) {
            case 0:
              r3 = `as a runtime entry of chunk ${n2}`;
              break;
            case 1:
              r3 = `because it was required from module ${n2}`;
              break;
            case 2:
              r3 = "because of an HMR update";
              break;
            default:
              w(t3, (e4) => `Unknown source type: ${e4}`);
          }
          throw Error(`Module ${e3} was instantiated ${r3}, but the module factory is not available. It might have been deleted in an HMR update.`);
        }(e2, t2, r2);
        let u2 = s(e2), i2 = u2.exports;
        A[e2] = u2;
        let l2 = new n(u2, i2);
        try {
          o2(l2, u2, i2);
        } catch (e3) {
          throw u2.error = e3, e3;
        }
        return u2.namespaceObject && u2.exports !== u2.namespaceObject && d(u2.exports, u2.namespaceObject), u2;
      }
      function S(t2) {
        let n2, r2 = function(e2) {
          if ("string" == typeof e2) return e2;
          let t3 = decodeURIComponent(("undefined" != typeof TURBOPACK_NEXT_CHUNK_URLS ? TURBOPACK_NEXT_CHUNK_URLS.pop() : e2.getAttribute("src")).replace(/[?#].*$/, ""));
          return t3.startsWith("") ? t3.slice(0) : t3;
        }(t2[0]);
        return 2 === t2.length ? n2 = t2[1] : (n2 = void 0, !function(e2, t3, n3, r3) {
          let o2 = 1;
          for (; o2 < e2.length; ) {
            let t4 = e2[o2], r4 = o2 + 1;
            for (; r4 < e2.length && "function" != typeof e2[r4]; ) r4++;
            if (r4 === e2.length) throw Error("malformed chunk format, expected a factory function");
            if (!n3.has(t4)) {
              let u2 = e2[r4];
              for (Object.defineProperty(u2, "name", { value: "__TURBOPACK__module__evaluation__" }); o2 < r4; o2++) t4 = e2[o2], n3.set(t4, u2);
            }
            o2 = r4 + 1;
          }
        }(t2, 0, k)), e.registerChunk(r2, n2);
      }
      function N(e2, t2, n2 = false) {
        let r2;
        try {
          r2 = t2();
        } catch (t3) {
          throw Error(`Failed to load external module ${e2}: ${t3}`);
        }
        return !n2 || r2.__esModule ? r2 : d(r2, h(r2), true);
      }
      r.y = async function(e2) {
        let t2;
        try {
          t2 = await import(e2);
        } catch (t3) {
          throw Error(`Failed to load external module ${e2}: ${t3}`);
        }
        return t2 && t2.__esModule && t2.default && "default" in t2.default ? d(t2.default, h(t2), true) : t2;
      }, N.resolve = (e2, t2) => __require.resolve(e2, t2), r.x = N, (() => {
        e = { registerChunk(e2, o3) {
          t2.add(e2), function(e3) {
            let t3 = n2.get(e3);
            if (null != t3) {
              for (let n3 of t3) n3.requiredChunks.delete(e3), 0 === n3.requiredChunks.size && r2(n3.runtimeModuleIds, n3.chunkPath);
              n2.delete(e3);
            }
          }(e2), null != o3 && (0 === o3.otherChunks.length ? r2(o3.runtimeModuleIds, e2) : function(e3, o4, u2) {
            let i2 = /* @__PURE__ */ new Set(), l2 = { runtimeModuleIds: u2, chunkPath: e3, requiredChunks: i2 };
            for (let e4 of o4) {
              let r3 = p(e4);
              if (t2.has(r3)) continue;
              i2.add(r3);
              let o5 = n2.get(r3);
              null == o5 && (o5 = /* @__PURE__ */ new Set(), n2.set(r3, o5)), o5.add(l2);
            }
            0 === l2.requiredChunks.size && r2(l2.runtimeModuleIds, l2.chunkPath);
          }(e2, o3.otherChunks.filter((e3) => {
            var t3;
            return t3 = p(e3), x.test(t3);
          }), o3.runtimeModuleIds));
        }, loadChunkCached(e2, t3) {
          throw Error("chunk loading is not supported");
        }, async loadWebAssembly(e2, t3, n3, r3, u2) {
          let i2 = await o2(n3, r3);
          return await WebAssembly.instantiate(i2, u2);
        }, loadWebAssemblyModule: async (e2, t3, n3, r3) => o2(n3, r3) };
        let t2 = /* @__PURE__ */ new Set(), n2 = /* @__PURE__ */ new Map();
        function r2(e2, t3) {
          for (let n3 of e2) !function(e3, t4) {
            let n4 = A[t4];
            if (n4) {
              if (n4.error) throw n4.error;
              return;
            }
            K(t4, C.Runtime, e3);
          }(t3, n3);
        }
        async function o2(e2, t3) {
          let n3;
          try {
            n3 = t3();
          } catch (e3) {
          }
          if (!n3) throw Error(`dynamically loading WebAssembly is not supported in this runtime as global was not injected for chunk '${e2}'`);
          return n3;
        }
      })();
      let q = globalThis.TURBOPACK;
      globalThis.TURBOPACK = { push: S }, q.forEach(S);
    })();
  }
});

// node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js
var edgeFunctionHandler_exports = {};
__export(edgeFunctionHandler_exports, {
  default: () => edgeFunctionHandler
});
async function edgeFunctionHandler(request) {
  const path3 = new URL(request.url).pathname;
  const routes = globalThis._ROUTES;
  const correspondingRoute = routes.find((route) => route.regex.some((r) => new RegExp(r).test(path3)));
  if (!correspondingRoute) {
    throw new Error(`No route found for ${request.url}`);
  }
  const entry = await self._ENTRIES[`middleware_${correspondingRoute.name}`];
  const result = await entry.default({
    page: correspondingRoute.page,
    request: {
      ...request,
      page: {
        name: correspondingRoute.name
      }
    }
  });
  globalThis.__openNextAls.getStore()?.pendingPromiseRunner.add(result.waitUntil);
  const response = result.response;
  return response;
}
var init_edgeFunctionHandler = __esm({
  "node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js"() {
    globalThis._ENTRIES = {};
    globalThis.self = globalThis;
    globalThis._ROUTES = [{ "name": "middleware", "page": "/", "regex": ["^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*))(\\\\.json)?[\\/#\\?]?$", "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/(api|trpc))(.*)(\\\\.json)?[\\/#\\?]?$"] }];
    require_dc8116b();
    require_node_modules_next_dist_esm_api_headers_95aeb203();
    require_root_of_the_server_f0c622ec();
    require_node_modules_next_dist_f455c4eb();
    require_turbopack_edge_wrapper_5652c305();
  }
});

// node_modules/@opennextjs/aws/dist/utils/promise.js
init_logger();
var DetachedPromise = class {
  resolve;
  reject;
  promise;
  constructor() {
    let resolve;
    let reject;
    this.promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    this.resolve = resolve;
    this.reject = reject;
  }
};
var DetachedPromiseRunner = class {
  promises = [];
  withResolvers() {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    return detachedPromise;
  }
  add(promise) {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    promise.then(detachedPromise.resolve, detachedPromise.reject);
  }
  async await() {
    debug(`Awaiting ${this.promises.length} detached promises`);
    const results = await Promise.allSettled(this.promises.map((p) => p.promise));
    const rejectedPromises = results.filter((r) => r.status === "rejected");
    rejectedPromises.forEach((r) => {
      error(r.reason);
    });
  }
};
async function awaitAllDetachedPromise() {
  const store = globalThis.__openNextAls.getStore();
  const promisesToAwait = store?.pendingPromiseRunner.await() ?? Promise.resolve();
  if (store?.waitUntil) {
    store.waitUntil(promisesToAwait);
    return;
  }
  await promisesToAwait;
}
function provideNextAfterProvider() {
  const NEXT_REQUEST_CONTEXT_SYMBOL = Symbol.for("@next/request-context");
  const VERCEL_REQUEST_CONTEXT_SYMBOL = Symbol.for("@vercel/request-context");
  const store = globalThis.__openNextAls.getStore();
  const waitUntil = store?.waitUntil ?? ((promise) => store?.pendingPromiseRunner.add(promise));
  const nextAfterContext = {
    get: () => ({
      waitUntil
    })
  };
  globalThis[NEXT_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  if (process.env.EMULATE_VERCEL_REQUEST_CONTEXT) {
    globalThis[VERCEL_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  }
}
function runWithOpenNextRequestContext({ isISRRevalidation, waitUntil, requestId = Math.random().toString(36) }, fn) {
  return globalThis.__openNextAls.run({
    requestId,
    pendingPromiseRunner: new DetachedPromiseRunner(),
    isISRRevalidation,
    waitUntil,
    writtenTags: /* @__PURE__ */ new Set()
  }, async () => {
    provideNextAfterProvider();
    let result;
    try {
      result = await fn();
    } finally {
      await awaitAllDetachedPromise();
    }
    return result;
  });
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/resolve.js
async function resolveConverter(converter2) {
  if (typeof converter2 === "function") {
    return converter2();
  }
  const m_1 = await Promise.resolve().then(() => (init_edge(), edge_exports));
  return m_1.default;
}
async function resolveWrapper(wrapper) {
  if (typeof wrapper === "function") {
    return wrapper();
  }
  const m_1 = await Promise.resolve().then(() => (init_cloudflare_edge(), cloudflare_edge_exports));
  return m_1.default;
}
async function resolveOriginResolver(originResolver) {
  if (typeof originResolver === "function") {
    return originResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_pattern_env(), pattern_env_exports));
  return m_1.default;
}
async function resolveAssetResolver(assetResolver) {
  if (typeof assetResolver === "function") {
    return assetResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy(), dummy_exports));
  return m_1.default;
}
async function resolveProxyRequest(proxyRequest) {
  if (typeof proxyRequest === "function") {
    return proxyRequest();
  }
  const m_1 = await Promise.resolve().then(() => (init_fetch(), fetch_exports));
  return m_1.default;
}

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
async function createGenericHandler(handler3) {
  const config = await import("./open-next.config.mjs").then((m) => m.default);
  globalThis.openNextConfig = config;
  const handlerConfig = config[handler3.type];
  const override = handlerConfig && "override" in handlerConfig ? handlerConfig.override : void 0;
  const converter2 = await resolveConverter(override?.converter);
  const { name, wrapper } = await resolveWrapper(override?.wrapper);
  debug("Using wrapper", name);
  return wrapper(handler3.handler, converter2);
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
import crypto2 from "node:crypto";
import { parse as parseQs, stringify as stringifyQs } from "node:querystring";
import { Readable as Readable2 } from "node:stream";

// node_modules/@opennextjs/aws/dist/adapters/config/index.js
init_logger();
import path from "node:path";
globalThis.__dirname ??= "";
var NEXT_DIR = path.join(__dirname, ".next");
var OPEN_NEXT_DIR = path.join(__dirname, ".open-next");
debug({ NEXT_DIR, OPEN_NEXT_DIR });
var NextConfig = { "env": {}, "webpack": null, "eslint": { "ignoreDuringBuilds": false }, "typescript": { "ignoreBuildErrors": false, "tsconfigPath": "tsconfig.json" }, "typedRoutes": false, "distDir": ".next", "cleanDistDir": true, "assetPrefix": "", "cacheMaxMemorySize": 52428800, "configOrigin": "next.config.ts", "useFileSystemPublicRoutes": true, "generateEtags": true, "pageExtensions": ["tsx", "ts", "jsx", "js"], "poweredByHeader": true, "compress": true, "images": { "deviceSizes": [640, 750, 828, 1080, 1200, 1920, 2048, 3840], "imageSizes": [16, 32, 48, 64, 96, 128, 256, 384], "path": "/_next/image", "loader": "default", "loaderFile": "", "domains": [], "disableStaticImages": false, "minimumCacheTTL": 60, "formats": ["image/webp"], "dangerouslyAllowSVG": false, "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;", "contentDispositionType": "attachment", "remotePatterns": [], "unoptimized": false }, "devIndicators": { "position": "bottom-left" }, "onDemandEntries": { "maxInactiveAge": 6e4, "pagesBufferLength": 5 }, "amp": { "canonicalBase": "" }, "basePath": "", "sassOptions": {}, "trailingSlash": false, "i18n": null, "productionBrowserSourceMaps": false, "excludeDefaultMomentLocales": true, "serverRuntimeConfig": {}, "publicRuntimeConfig": {}, "reactProductionProfiling": false, "reactStrictMode": null, "reactMaxHeadersLength": 6e3, "httpAgentOptions": { "keepAlive": true }, "logging": {}, "compiler": {}, "expireTime": 31536e3, "staticPageGenerationTimeout": 60, "output": "standalone", "modularizeImports": { "@mui/icons-material": { "transform": "@mui/icons-material/{{member}}" }, "lodash": { "transform": "lodash/{{member}}" } }, "outputFileTracingRoot": "C:\\Users\\Henrik\\Desktop\\PYProj\\InjexPro App\\injexpro-app", "experimental": { "useSkewCookie": false, "cacheLife": { "default": { "stale": 300, "revalidate": 900, "expire": 4294967294 }, "seconds": { "stale": 30, "revalidate": 1, "expire": 60 }, "minutes": { "stale": 300, "revalidate": 60, "expire": 3600 }, "hours": { "stale": 300, "revalidate": 3600, "expire": 86400 }, "days": { "stale": 300, "revalidate": 86400, "expire": 604800 }, "weeks": { "stale": 300, "revalidate": 604800, "expire": 2592e3 }, "max": { "stale": 300, "revalidate": 2592e3, "expire": 4294967294 } }, "cacheHandlers": {}, "cssChunking": true, "multiZoneDraftMode": false, "appNavFailHandling": false, "prerenderEarlyExit": true, "serverMinification": true, "serverSourceMaps": false, "linkNoTouchStart": false, "caseSensitiveRoutes": false, "clientSegmentCache": false, "clientParamParsing": false, "dynamicOnHover": false, "preloadEntriesOnStart": true, "clientRouterFilter": true, "clientRouterFilterRedirects": false, "fetchCacheKeyPrefix": "", "middlewarePrefetch": "flexible", "optimisticClientCache": true, "manualClientBasePath": false, "cpus": 15, "memoryBasedWorkersCount": false, "imgOptConcurrency": null, "imgOptTimeoutInSeconds": 7, "imgOptMaxInputPixels": 268402689, "imgOptSequentialRead": null, "imgOptSkipMetadata": null, "isrFlushToDisk": true, "workerThreads": false, "optimizeCss": false, "nextScriptWorkers": false, "scrollRestoration": false, "externalDir": false, "disableOptimizedLoading": false, "gzipSize": true, "craCompat": false, "esmExternals": true, "fullySpecified": false, "swcTraceProfiling": false, "forceSwcTransforms": false, "largePageDataBytes": 128e3, "typedEnv": false, "parallelServerCompiles": false, "parallelServerBuildTraces": false, "ppr": false, "authInterrupts": false, "webpackMemoryOptimizations": false, "optimizeServerReact": true, "viewTransition": false, "routerBFCache": false, "removeUncaughtErrorAndRejectionListeners": false, "validateRSCRequestHeaders": false, "staleTimes": { "dynamic": 0, "static": 300 }, "serverComponentsHmrCache": true, "staticGenerationMaxConcurrency": 8, "staticGenerationMinPagesPerWorker": 25, "cacheComponents": false, "inlineCss": false, "useCache": false, "globalNotFound": false, "devtoolSegmentExplorer": true, "browserDebugInfoInTerminal": false, "optimizeRouterScrolling": false, "optimizePackageImports": ["lucide-react", "date-fns", "lodash-es", "ramda", "antd", "react-bootstrap", "ahooks", "@ant-design/icons", "@headlessui/react", "@headlessui-float/react", "@heroicons/react/20/solid", "@heroicons/react/24/solid", "@heroicons/react/24/outline", "@visx/visx", "@tremor/react", "rxjs", "@mui/material", "@mui/icons-material", "recharts", "react-use", "effect", "@effect/schema", "@effect/platform", "@effect/platform-node", "@effect/platform-browser", "@effect/platform-bun", "@effect/sql", "@effect/sql-mssql", "@effect/sql-mysql2", "@effect/sql-pg", "@effect/sql-sqlite-node", "@effect/sql-sqlite-bun", "@effect/sql-sqlite-wasm", "@effect/sql-sqlite-react-native", "@effect/rpc", "@effect/rpc-http", "@effect/typeclass", "@effect/experimental", "@effect/opentelemetry", "@material-ui/core", "@material-ui/icons", "@tabler/icons-react", "mui-core", "react-icons/ai", "react-icons/bi", "react-icons/bs", "react-icons/cg", "react-icons/ci", "react-icons/di", "react-icons/fa", "react-icons/fa6", "react-icons/fc", "react-icons/fi", "react-icons/gi", "react-icons/go", "react-icons/gr", "react-icons/hi", "react-icons/hi2", "react-icons/im", "react-icons/io", "react-icons/io5", "react-icons/lia", "react-icons/lib", "react-icons/lu", "react-icons/md", "react-icons/pi", "react-icons/ri", "react-icons/rx", "react-icons/si", "react-icons/sl", "react-icons/tb", "react-icons/tfi", "react-icons/ti", "react-icons/vsc", "react-icons/wi"], "trustHostHeader": false, "isExperimentalCompile": false }, "htmlLimitedBots": "[\\w-]+-Google|Google-[\\w-]+|Chrome-Lighthouse|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti|googleweblight", "bundlePagesRouterDependencies": false, "configFileName": "next.config.ts", "turbopack": { "root": "C:\\Users\\Henrik\\Desktop\\PYProj\\InjexPro App\\injexpro-app" } };
var BuildId = "epU2Q6KkypYqNRQmeKRMB";
var RoutesManifest = { "basePath": "", "rewrites": { "beforeFiles": [], "afterFiles": [], "fallback": [] }, "redirects": [{ "source": "/:path+/", "destination": "/:path+", "internal": true, "statusCode": 308, "regex": "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$" }], "routes": { "static": [{ "page": "/", "regex": "^/(?:/)?$", "routeKeys": {}, "namedRegex": "^/(?:/)?$" }, { "page": "/_not-found", "regex": "^/_not\\-found(?:/)?$", "routeKeys": {}, "namedRegex": "^/_not\\-found(?:/)?$" }, { "page": "/dashboard", "regex": "^/dashboard(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard(?:/)?$" }, { "page": "/dashboard/atlas/muscles", "regex": "^/dashboard/atlas/muscles(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/atlas/muscles(?:/)?$" }, { "page": "/dashboard/atlas/procedures", "regex": "^/dashboard/atlas/procedures(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/atlas/procedures(?:/)?$" }, { "page": "/dashboard/complications", "regex": "^/dashboard/complications(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/complications(?:/)?$" }, { "page": "/favicon.ico", "regex": "^/favicon\\.ico(?:/)?$", "routeKeys": {}, "namedRegex": "^/favicon\\.ico(?:/)?$" }], "dynamic": [{ "page": "/sign-in/[[...sign-in]]", "regex": "^/sign\\-in(?:/(.+?))?(?:/)?$", "routeKeys": { "nxtPsignin": "nxtPsign-in" }, "namedRegex": "^/sign\\-in(?:/(?<nxtPsignin>.+?))?(?:/)?$" }, { "page": "/sign-up/[[...sign-up]]", "regex": "^/sign\\-up(?:/(.+?))?(?:/)?$", "routeKeys": { "nxtPsignup": "nxtPsign-up" }, "namedRegex": "^/sign\\-up(?:/(?<nxtPsignup>.+?))?(?:/)?$" }], "data": { "static": [], "dynamic": [] } }, "locales": [] };
var ConfigHeaders = [];
var PrerenderManifest = { "version": 4, "routes": { "/favicon.ico": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "image/x-icon", "x-next-cache-tags": "_N_T_/layout,_N_T_/favicon.ico/layout,_N_T_/favicon.ico/route,_N_T_/favicon.ico" }, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/favicon.ico", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/", "dataRoute": "/index.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/_not-found": { "initialStatus": 404, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/_not-found", "dataRoute": "/_not-found.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] } }, "dynamicRoutes": {}, "notFoundRoutes": [], "preview": { "previewModeId": "359e69ba78348bca975d9dacb936dc83", "previewModeSigningKey": "d128931ab523efa841f730aa300ca5068a39b662964b7005dedde1de63fe6d2e", "previewModeEncryptionKey": "97618f35287e568bddfbdf7d7d433ea33da3735c8055b080adc6d82d76687b66" } };
var MiddlewareManifest = { "version": 3, "middleware": { "/": { "files": ["server/edge/chunks/_9dc8116b._.js", "server/edge/chunks/node_modules_next_dist_esm_api_headers_95aeb203.js", "server/edge/chunks/[root-of-the-server]__f0c622ec._.js", "server/edge/chunks/node_modules_next_dist_f455c4eb._.js", "server/edge/chunks/turbopack-edge-wrapper_5652c305.js"], "name": "middleware", "page": "/", "matchers": [{ "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*))(\\\\.json)?[\\/#\\?]?$", "originalSource": "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)" }, { "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/(api|trpc))(.*)(\\\\.json)?[\\/#\\?]?$", "originalSource": "/(api|trpc)(.*)" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "epU2Q6KkypYqNRQmeKRMB", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "p3xgRhQ5WhPSJP19U3jfCDlmUQitTyk6fMLZQdJaaIU=", "__NEXT_PREVIEW_MODE_ID": "359e69ba78348bca975d9dacb936dc83", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "97618f35287e568bddfbdf7d7d433ea33da3735c8055b080adc6d82d76687b66", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "d128931ab523efa841f730aa300ca5068a39b662964b7005dedde1de63fe6d2e" } } }, "sortedMiddleware": ["/"], "functions": {} };
var AppPathRoutesManifest = { "/_not-found/page": "/_not-found", "/api/health/supabase/route": "/api/health/supabase", "/dashboard/atlas/muscles/page": "/dashboard/atlas/muscles", "/dashboard/atlas/procedures/page": "/dashboard/atlas/procedures", "/dashboard/complications/page": "/dashboard/complications", "/dashboard/page": "/dashboard", "/favicon.ico/route": "/favicon.ico", "/page": "/", "/sign-in/[[...sign-in]]/page": "/sign-in/[[...sign-in]]", "/sign-up/[[...sign-up]]/page": "/sign-up/[[...sign-up]]" };
var FunctionsConfigManifest = { "version": 1, "functions": {} };
var PagesManifest = { "/_app": "pages/_app.js", "/_document": "pages/_document.js", "/_error": "pages/_error.js", "/404": "pages/404.html" };
process.env.NEXT_BUILD_ID = BuildId;

// node_modules/@opennextjs/aws/dist/http/openNextResponse.js
init_logger();
init_util();
import { Transform } from "node:stream";

// node_modules/@opennextjs/aws/dist/core/routing/util.js
init_util();
init_logger();

// node_modules/@opennextjs/aws/dist/utils/binary.js
var commonBinaryMimeTypes = /* @__PURE__ */ new Set([
  "application/octet-stream",
  // Docs
  "application/epub+zip",
  "application/msword",
  "application/pdf",
  "application/rtf",
  "application/vnd.amazon.ebook",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  // Fonts
  "font/otf",
  "font/woff",
  "font/woff2",
  // Images
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/tiff",
  "image/vnd.microsoft.icon",
  "image/webp",
  // Audio
  "audio/3gpp",
  "audio/aac",
  "audio/basic",
  "audio/flac",
  "audio/mpeg",
  "audio/ogg",
  "audio/wavaudio/webm",
  "audio/x-aiff",
  "audio/x-midi",
  "audio/x-wav",
  // Video
  "video/3gpp",
  "video/mp2t",
  "video/mpeg",
  "video/ogg",
  "video/quicktime",
  "video/webm",
  "video/x-msvideo",
  // Archives
  "application/java-archive",
  "application/vnd.apple.installer+xml",
  "application/x-7z-compressed",
  "application/x-apple-diskimage",
  "application/x-bzip",
  "application/x-bzip2",
  "application/x-gzip",
  "application/x-java-archive",
  "application/x-rar-compressed",
  "application/x-tar",
  "application/x-zip",
  "application/zip",
  // Serialized data
  "application/x-protobuf"
]);
function isBinaryContentType(contentType) {
  if (!contentType)
    return false;
  const value = contentType?.split(";")[0] ?? "";
  return commonBinaryMimeTypes.has(value);
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/i18n/accept-header.js
function parse(raw, preferences, options) {
  const lowers = /* @__PURE__ */ new Map();
  const header = raw.replace(/[ \t]/g, "");
  if (preferences) {
    let pos = 0;
    for (const preference of preferences) {
      const lower = preference.toLowerCase();
      lowers.set(lower, { orig: preference, pos: pos++ });
      if (options.prefixMatch) {
        const parts2 = lower.split("-");
        while (parts2.pop(), parts2.length > 0) {
          const joined = parts2.join("-");
          if (!lowers.has(joined)) {
            lowers.set(joined, { orig: preference, pos: pos++ });
          }
        }
      }
    }
  }
  const parts = header.split(",");
  const selections = [];
  const map = /* @__PURE__ */ new Set();
  for (let i = 0; i < parts.length; ++i) {
    const part = parts[i];
    if (!part) {
      continue;
    }
    const params = part.split(";");
    if (params.length > 2) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const token = params[0].toLowerCase();
    if (!token) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const selection = { token, pos: i, q: 1 };
    if (preferences && lowers.has(token)) {
      selection.pref = lowers.get(token).pos;
    }
    map.add(selection.token);
    if (params.length === 2) {
      const q = params[1];
      const [key, value] = q.split("=");
      if (!value || key !== "q" && key !== "Q") {
        throw new Error(`Invalid ${options.type} header`);
      }
      const score = Number.parseFloat(value);
      if (score === 0) {
        continue;
      }
      if (Number.isFinite(score) && score <= 1 && score >= 1e-3) {
        selection.q = score;
      }
    }
    selections.push(selection);
  }
  selections.sort((a, b) => {
    if (b.q !== a.q) {
      return b.q - a.q;
    }
    if (b.pref !== a.pref) {
      if (a.pref === void 0) {
        return 1;
      }
      if (b.pref === void 0) {
        return -1;
      }
      return a.pref - b.pref;
    }
    return a.pos - b.pos;
  });
  const values = selections.map((selection) => selection.token);
  if (!preferences || !preferences.length) {
    return values;
  }
  const preferred = [];
  for (const selection of values) {
    if (selection === "*") {
      for (const [preference, value] of lowers) {
        if (!map.has(preference)) {
          preferred.push(value.orig);
        }
      }
    } else {
      const lower = selection.toLowerCase();
      if (lowers.has(lower)) {
        preferred.push(lowers.get(lower).orig);
      }
    }
  }
  return preferred;
}
function acceptLanguage(header = "", preferences) {
  return parse(header, preferences, {
    type: "accept-language",
    prefixMatch: true
  })[0] || void 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
function isLocalizedPath(path3) {
  return NextConfig.i18n?.locales.includes(path3.split("/")[1].toLowerCase()) ?? false;
}
function getLocaleFromCookie(cookies) {
  const i18n = NextConfig.i18n;
  const nextLocale = cookies.NEXT_LOCALE?.toLowerCase();
  return nextLocale ? i18n?.locales.find((locale) => nextLocale === locale.toLowerCase()) : void 0;
}
function detectDomainLocale({ hostname, detectedLocale }) {
  const i18n = NextConfig.i18n;
  const domains = i18n?.domains;
  if (!domains) {
    return;
  }
  const lowercasedLocale = detectedLocale?.toLowerCase();
  for (const domain of domains) {
    const domainHostname = domain.domain.split(":", 1)[0].toLowerCase();
    if (hostname === domainHostname || lowercasedLocale === domain.defaultLocale.toLowerCase() || domain.locales?.some((locale) => lowercasedLocale === locale.toLowerCase())) {
      return domain;
    }
  }
}
function detectLocale(internalEvent, i18n) {
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  if (i18n.localeDetection === false) {
    return domainLocale?.defaultLocale ?? i18n.defaultLocale;
  }
  const cookiesLocale = getLocaleFromCookie(internalEvent.cookies);
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  debug({
    cookiesLocale,
    preferredLocale,
    defaultLocale: i18n.defaultLocale,
    domainLocale
  });
  return domainLocale?.defaultLocale ?? cookiesLocale ?? preferredLocale ?? i18n.defaultLocale;
}
function localizePath(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n) {
    return internalEvent.rawPath;
  }
  if (isLocalizedPath(internalEvent.rawPath)) {
    return internalEvent.rawPath;
  }
  const detectedLocale = detectLocale(internalEvent, i18n);
  return `/${detectedLocale}${internalEvent.rawPath}`;
}
function handleLocaleRedirect(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n || i18n.localeDetection === false || internalEvent.rawPath !== "/") {
    return false;
  }
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  const detectedLocale = detectLocale(internalEvent, i18n);
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  const preferredDomain = detectDomainLocale({
    detectedLocale: preferredLocale
  });
  if (domainLocale && preferredDomain) {
    const isPDomain = preferredDomain.domain === domainLocale.domain;
    const isPLocale = preferredDomain.defaultLocale === preferredLocale;
    if (!isPDomain || !isPLocale) {
      const scheme = `http${preferredDomain.http ? "" : "s"}`;
      const rlocale = isPLocale ? "" : preferredLocale;
      return {
        type: "core",
        statusCode: 307,
        headers: {
          Location: `${scheme}://${preferredDomain.domain}/${rlocale}`
        },
        body: emptyReadableStream(),
        isBase64Encoded: false
      };
    }
  }
  const defaultLocale = domainLocale?.defaultLocale ?? i18n.defaultLocale;
  if (detectedLocale.toLowerCase() !== defaultLocale.toLowerCase()) {
    return {
      type: "core",
      statusCode: 307,
      headers: {
        Location: constructNextUrl(internalEvent.url, `/${detectedLocale}`)
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}

// node_modules/@opennextjs/aws/dist/core/routing/queue.js
function generateShardId(rawPath, maxConcurrency, prefix) {
  let a = cyrb128(rawPath);
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  const randomFloat = ((t ^ t >>> 14) >>> 0) / 4294967296;
  const randomInt = Math.floor(randomFloat * maxConcurrency);
  return `${prefix}-${randomInt}`;
}
function generateMessageGroupId(rawPath) {
  const maxConcurrency = Number.parseInt(process.env.MAX_REVALIDATE_CONCURRENCY ?? "10");
  return generateShardId(rawPath, maxConcurrency, "revalidate");
}
function cyrb128(str) {
  let h1 = 1779033703;
  let h2 = 3144134277;
  let h3 = 1013904242;
  let h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ h1 >>> 18, 597399067);
  h2 = Math.imul(h4 ^ h2 >>> 22, 2869860233);
  h3 = Math.imul(h1 ^ h3 >>> 17, 951274213);
  h4 = Math.imul(h2 ^ h4 >>> 19, 2716044179);
  h1 ^= h2 ^ h3 ^ h4, h2 ^= h1, h3 ^= h1, h4 ^= h1;
  return h1 >>> 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
function isExternal(url, host) {
  if (!url)
    return false;
  const pattern = /^https?:\/\//;
  if (host) {
    return pattern.test(url) && !url.includes(host);
  }
  return pattern.test(url);
}
function convertFromQueryString(query) {
  if (query === "")
    return {};
  const queryParts = query.split("&");
  return getQueryFromIterator(queryParts.map((p) => {
    const [key, value] = p.split("=");
    return [key, value];
  }));
}
function getUrlParts(url, isExternal2) {
  if (!isExternal2) {
    const regex2 = /\/([^?]*)\??(.*)/;
    const match3 = url.match(regex2);
    return {
      hostname: "",
      pathname: match3?.[1] ? `/${match3[1]}` : url,
      protocol: "",
      queryString: match3?.[2] ?? ""
    };
  }
  const regex = /^(https?:)\/\/?([^\/\s]+)(\/[^?]*)?(\?.*)?/;
  const match2 = url.match(regex);
  if (!match2) {
    throw new Error(`Invalid external URL: ${url}`);
  }
  return {
    protocol: match2[1] ?? "https:",
    hostname: match2[2],
    pathname: match2[3] ?? "",
    queryString: match2[4]?.slice(1) ?? ""
  };
}
function constructNextUrl(baseUrl, path3) {
  const nextBasePath = NextConfig.basePath ?? "";
  const url = new URL(`${nextBasePath}${path3}`, baseUrl);
  return url.href;
}
function convertToQueryString(query) {
  const queryStrings = [];
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => queryStrings.push(`${key}=${entry}`));
    } else {
      queryStrings.push(`${key}=${value}`);
    }
  });
  return queryStrings.length > 0 ? `?${queryStrings.join("&")}` : "";
}
function getMiddlewareMatch(middlewareManifest2, functionsManifest) {
  if (functionsManifest?.functions?.["/_middleware"]) {
    return functionsManifest.functions["/_middleware"].matchers?.map(({ regexp }) => new RegExp(regexp)) ?? [/.*/];
  }
  const rootMiddleware = middlewareManifest2.middleware["/"];
  if (!rootMiddleware?.matchers)
    return [];
  return rootMiddleware.matchers.map(({ regexp }) => new RegExp(regexp));
}
function escapeRegex(str, { isPath } = {}) {
  const result = str.replaceAll("(.)", "_\xB51_").replaceAll("(..)", "_\xB52_").replaceAll("(...)", "_\xB53_");
  return isPath ? result : result.replaceAll("+", "_\xB54_");
}
function unescapeRegex(str) {
  return str.replaceAll("_\xB51_", "(.)").replaceAll("_\xB52_", "(..)").replaceAll("_\xB53_", "(...)").replaceAll("_\xB54_", "+");
}
function convertBodyToReadableStream(method, body) {
  if (method === "GET" || method === "HEAD")
    return void 0;
  if (!body)
    return void 0;
  const readable = new ReadableStream({
    start(controller) {
      controller.enqueue(body);
      controller.close();
    }
  });
  return readable;
}
var CommonHeaders;
(function(CommonHeaders2) {
  CommonHeaders2["CACHE_CONTROL"] = "cache-control";
  CommonHeaders2["NEXT_CACHE"] = "x-nextjs-cache";
})(CommonHeaders || (CommonHeaders = {}));
function normalizeLocationHeader(location2, baseUrl, encodeQuery = false) {
  if (!URL.canParse(location2)) {
    return location2;
  }
  const locationURL = new URL(location2);
  const origin = new URL(baseUrl).origin;
  let search = locationURL.search;
  if (encodeQuery && search) {
    search = `?${stringifyQs(parseQs(search.slice(1)))}`;
  }
  const href = `${locationURL.origin}${locationURL.pathname}${search}${locationURL.hash}`;
  if (locationURL.origin === origin) {
    return href.slice(origin.length);
  }
  return href;
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
import { createHash } from "node:crypto";
init_stream();

// node_modules/@opennextjs/aws/dist/utils/cache.js
init_logger();
async function hasBeenRevalidated(key, tags, cacheEntry) {
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  const value = cacheEntry.value;
  if (!value) {
    return true;
  }
  if ("type" in cacheEntry && cacheEntry.type === "page") {
    return false;
  }
  const lastModified = cacheEntry.lastModified ?? Date.now();
  if (globalThis.tagCache.mode === "nextMode") {
    return await globalThis.tagCache.hasBeenRevalidated(tags, lastModified);
  }
  const _lastModified = await globalThis.tagCache.getLastModified(key, lastModified);
  return _lastModified === -1;
}
function getTagsFromValue(value) {
  if (!value) {
    return [];
  }
  try {
    return value.meta?.headers?.["x-next-cache-tags"]?.split(",") ?? [];
  } catch (e) {
    return [];
  }
}

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
init_logger();
var CACHE_ONE_YEAR = 60 * 60 * 24 * 365;
var CACHE_ONE_MONTH = 60 * 60 * 24 * 30;
var VARY_HEADER = "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Next-Url";
async function computeCacheControl(path3, body, host, revalidate, lastModified) {
  let finalRevalidate = CACHE_ONE_YEAR;
  const existingRoute = Object.entries(PrerenderManifest.routes).find((p) => p[0] === path3)?.[1];
  if (revalidate === void 0 && existingRoute) {
    finalRevalidate = existingRoute.initialRevalidateSeconds === false ? CACHE_ONE_YEAR : existingRoute.initialRevalidateSeconds;
  } else if (revalidate !== void 0) {
    finalRevalidate = revalidate === false ? CACHE_ONE_YEAR : revalidate;
  }
  const age = Math.round((Date.now() - (lastModified ?? 0)) / 1e3);
  const hash = (str) => createHash("md5").update(str).digest("hex");
  const etag = hash(body);
  if (revalidate === 0) {
    return {
      "cache-control": "private, no-cache, no-store, max-age=0, must-revalidate",
      "x-opennext-cache": "ERROR",
      etag
    };
  }
  if (finalRevalidate !== CACHE_ONE_YEAR) {
    const sMaxAge = Math.max(finalRevalidate - age, 1);
    debug("sMaxAge", {
      finalRevalidate,
      age,
      lastModified,
      revalidate
    });
    const isStale = sMaxAge === 1;
    if (isStale) {
      let url = NextConfig.trailingSlash ? `${path3}/` : path3;
      if (NextConfig.basePath) {
        url = `${NextConfig.basePath}${url}`;
      }
      await globalThis.queue.send({
        MessageBody: {
          host,
          url,
          eTag: etag,
          lastModified: lastModified ?? Date.now()
        },
        MessageDeduplicationId: hash(`${path3}-${lastModified}-${etag}`),
        MessageGroupId: generateMessageGroupId(path3)
      });
    }
    return {
      "cache-control": `s-maxage=${sMaxAge}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
      "x-opennext-cache": isStale ? "STALE" : "HIT",
      etag
    };
  }
  return {
    "cache-control": `s-maxage=${CACHE_ONE_YEAR}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
    "x-opennext-cache": "HIT",
    etag
  };
}
async function generateResult(event, localizedPath, cachedValue, lastModified) {
  debug("Returning result from experimental cache");
  let body = "";
  let type = "application/octet-stream";
  let isDataRequest = false;
  switch (cachedValue.type) {
    case "app":
      isDataRequest = Boolean(event.headers.rsc);
      body = isDataRequest ? cachedValue.rsc : cachedValue.html;
      type = isDataRequest ? "text/x-component" : "text/html; charset=utf-8";
      break;
    case "page":
      isDataRequest = Boolean(event.query.__nextDataReq);
      body = isDataRequest ? JSON.stringify(cachedValue.json) : cachedValue.html;
      type = isDataRequest ? "application/json" : "text/html; charset=utf-8";
      break;
  }
  const cacheControl = await computeCacheControl(localizedPath, body, event.headers.host, cachedValue.revalidate, lastModified);
  return {
    type: "core",
    // sometimes other status codes can be cached, like 404. For these cases, we should return the correct status code
    statusCode: cachedValue.meta?.status ?? 200,
    body: toReadableStream(body, false),
    isBase64Encoded: false,
    headers: {
      ...cacheControl,
      "content-type": type,
      ...cachedValue.meta?.headers,
      vary: VARY_HEADER
    }
  };
}
function escapePathDelimiters(segment, escapeEncoded) {
  return segment.replace(new RegExp(`([/#?]${escapeEncoded ? "|%(2f|23|3f|5c)" : ""})`, "gi"), (char) => encodeURIComponent(char));
}
function decodePathParams(pathname) {
  return pathname.split("/").map((segment) => {
    try {
      return escapePathDelimiters(decodeURIComponent(segment), true);
    } catch (e) {
      return segment;
    }
  }).join("/");
}
async function cacheInterceptor(event) {
  if (Boolean(event.headers["next-action"]) || Boolean(event.headers["x-prerender-revalidate"]))
    return event;
  const cookies = event.headers.cookie || "";
  const hasPreviewData = cookies.includes("__prerender_bypass") || cookies.includes("__next_preview_data");
  if (hasPreviewData) {
    debug("Preview mode detected, passing through to handler");
    return event;
  }
  let localizedPath = localizePath(event);
  if (NextConfig.basePath) {
    localizedPath = localizedPath.replace(NextConfig.basePath, "");
  }
  localizedPath = localizedPath.replace(/\/$/, "");
  localizedPath = decodePathParams(localizedPath);
  debug("Checking cache for", localizedPath, PrerenderManifest);
  const isISR = Object.keys(PrerenderManifest.routes).includes(localizedPath ?? "/") || Object.values(PrerenderManifest.dynamicRoutes).some((dr) => new RegExp(dr.routeRegex).test(localizedPath));
  debug("isISR", isISR);
  if (isISR) {
    try {
      const cachedData = await globalThis.incrementalCache.get(localizedPath ?? "/index");
      debug("cached data in interceptor", cachedData);
      if (!cachedData?.value) {
        return event;
      }
      if (cachedData.value?.type === "app" || cachedData.value?.type === "route") {
        const tags = getTagsFromValue(cachedData.value);
        const _hasBeenRevalidated = await hasBeenRevalidated(localizedPath, tags, cachedData);
        if (_hasBeenRevalidated) {
          return event;
        }
      }
      const host = event.headers.host;
      switch (cachedData?.value?.type) {
        case "app":
        case "page":
          return generateResult(event, localizedPath, cachedData.value, cachedData.lastModified);
        case "redirect": {
          const cacheControl = await computeCacheControl(localizedPath, "", host, cachedData.value.revalidate, cachedData.lastModified);
          return {
            type: "core",
            statusCode: cachedData.value.meta?.status ?? 307,
            body: emptyReadableStream(),
            headers: {
              ...cachedData.value.meta?.headers ?? {},
              ...cacheControl
            },
            isBase64Encoded: false
          };
        }
        case "route": {
          const cacheControl = await computeCacheControl(localizedPath, cachedData.value.body, host, cachedData.value.revalidate, cachedData.lastModified);
          const isBinary = isBinaryContentType(String(cachedData.value.meta?.headers?.["content-type"]));
          return {
            type: "core",
            statusCode: cachedData.value.meta?.status ?? 200,
            body: toReadableStream(cachedData.value.body, isBinary),
            headers: {
              ...cacheControl,
              ...cachedData.value.meta?.headers,
              vary: VARY_HEADER
            },
            isBase64Encoded: isBinary
          };
        }
        default:
          return event;
      }
    } catch (e) {
      debug("Error while fetching cache", e);
      return event;
    }
  }
  return event;
}

// node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse2(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path3 = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  var isSafe = function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  };
  var safePattern = function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path3 += prefix;
        prefix = "";
      }
      if (path3) {
        result.push(path3);
        path3 = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path3 += value;
      continue;
    }
    if (path3) {
      result.push(path3);
      path3 = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function compile(str, options) {
  return tokensToFunction(parse2(str, options), options);
}
function tokensToFunction(tokens, options) {
  if (options === void 0) {
    options = {};
  }
  var reFlags = flags(options);
  var _a = options.encode, encode = _a === void 0 ? function(x) {
    return x;
  } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
  var matches = tokens.map(function(token) {
    if (typeof token === "object") {
      return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
    }
  });
  return function(data) {
    var path3 = "";
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (typeof token === "string") {
        path3 += token;
        continue;
      }
      var value = data ? data[token.name] : void 0;
      var optional = token.modifier === "?" || token.modifier === "*";
      var repeat = token.modifier === "*" || token.modifier === "+";
      if (Array.isArray(value)) {
        if (!repeat) {
          throw new TypeError('Expected "'.concat(token.name, '" to not repeat, but got an array'));
        }
        if (value.length === 0) {
          if (optional)
            continue;
          throw new TypeError('Expected "'.concat(token.name, '" to not be empty'));
        }
        for (var j = 0; j < value.length; j++) {
          var segment = encode(value[j], token);
          if (validate && !matches[i].test(segment)) {
            throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
          }
          path3 += token.prefix + segment + token.suffix;
        }
        continue;
      }
      if (typeof value === "string" || typeof value === "number") {
        var segment = encode(String(value), token);
        if (validate && !matches[i].test(segment)) {
          throw new TypeError('Expected "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
        }
        path3 += token.prefix + segment + token.suffix;
        continue;
      }
      if (optional)
        continue;
      var typeOfMessage = repeat ? "an array" : "a string";
      throw new TypeError('Expected "'.concat(token.name, '" to be ').concat(typeOfMessage));
    }
    return path3;
  };
}
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path3 = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    };
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path: path3, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path3, keys) {
  if (!keys)
    return path3;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path3.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path3.source);
  }
  return path3;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path3) {
    return pathToRegexp(path3, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path3, keys, options) {
  return tokensToRegexp(parse2(path3, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path3, keys, options) {
  if (path3 instanceof RegExp)
    return regexpToRegexp(path3, keys);
  if (Array.isArray(path3))
    return arrayToRegexp(path3, keys, options);
  return stringToRegexp(path3, keys, options);
}

// node_modules/@opennextjs/aws/dist/utils/normalize-path.js
import path2 from "node:path";
function normalizeRepeatedSlashes(url) {
  const urlNoQuery = url.host + url.pathname;
  return `${url.protocol}//${urlNoQuery.replace(/\\/g, "/").replace(/\/\/+/g, "/")}${url.search}`;
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/routeMatcher.js
var optionalLocalePrefixRegex = `^/(?:${RoutesManifest.locales.map((locale) => `${locale}/?`).join("|")})?`;
var optionalBasepathPrefixRegex = RoutesManifest.basePath ? `^${RoutesManifest.basePath}/?` : "^/";
var optionalPrefix = optionalLocalePrefixRegex.replace("^/", optionalBasepathPrefixRegex);
function routeMatcher(routeDefinitions) {
  const regexp = routeDefinitions.map((route) => ({
    page: route.page,
    regexp: new RegExp(route.regex.replace("^/", optionalPrefix))
  }));
  const appPathsSet = /* @__PURE__ */ new Set();
  const routePathsSet = /* @__PURE__ */ new Set();
  for (const [k, v] of Object.entries(AppPathRoutesManifest)) {
    if (k.endsWith("page")) {
      appPathsSet.add(v);
    } else if (k.endsWith("route")) {
      routePathsSet.add(v);
    }
  }
  return function matchRoute(path3) {
    const foundRoutes = regexp.filter((route) => route.regexp.test(path3));
    return foundRoutes.map((foundRoute) => {
      let routeType = "page";
      if (appPathsSet.has(foundRoute.page)) {
        routeType = "app";
      } else if (routePathsSet.has(foundRoute.page)) {
        routeType = "route";
      }
      return {
        route: foundRoute.page,
        type: routeType
      };
    });
  };
}
var staticRouteMatcher = routeMatcher([
  ...RoutesManifest.routes.static,
  ...getStaticAPIRoutes()
]);
var dynamicRouteMatcher = routeMatcher(RoutesManifest.routes.dynamic);
function getStaticAPIRoutes() {
  const createRouteDefinition = (route) => ({
    page: route,
    regex: `^${route}(?:/)?$`
  });
  const dynamicRoutePages = new Set(RoutesManifest.routes.dynamic.map(({ page }) => page));
  const pagesStaticAPIRoutes = Object.keys(PagesManifest).filter((route) => route.startsWith("/api/") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  const appPathsStaticAPIRoutes = Object.values(AppPathRoutesManifest).filter((route) => route.startsWith("/api/") || route === "/api" && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  return [...pagesStaticAPIRoutes, ...appPathsStaticAPIRoutes];
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
var routeHasMatcher = (headers, cookies, query) => (redirect) => {
  switch (redirect.type) {
    case "header":
      return !!headers?.[redirect.key.toLowerCase()] && new RegExp(redirect.value ?? "").test(headers[redirect.key.toLowerCase()] ?? "");
    case "cookie":
      return !!cookies?.[redirect.key] && new RegExp(redirect.value ?? "").test(cookies[redirect.key] ?? "");
    case "query":
      return query[redirect.key] && Array.isArray(redirect.value) ? redirect.value.reduce((prev, current) => prev || new RegExp(current).test(query[redirect.key]), false) : new RegExp(redirect.value ?? "").test(query[redirect.key] ?? "");
    case "host":
      return headers?.host !== "" && new RegExp(redirect.value ?? "").test(headers.host);
    default:
      return false;
  }
};
function checkHas(matcher, has, inverted = false) {
  return has ? has.reduce((acc, cur) => {
    if (acc === false)
      return false;
    return inverted ? !matcher(cur) : matcher(cur);
  }, true) : true;
}
var getParamsFromSource = (source) => (value) => {
  debug("value", value);
  const _match = source(value);
  return _match ? _match.params : {};
};
var computeParamHas = (headers, cookies, query) => (has) => {
  if (!has.value)
    return {};
  const matcher = new RegExp(`^${has.value}$`);
  const fromSource = (value) => {
    const matches = value.match(matcher);
    return matches?.groups ?? {};
  };
  switch (has.type) {
    case "header":
      return fromSource(headers[has.key.toLowerCase()] ?? "");
    case "cookie":
      return fromSource(cookies[has.key] ?? "");
    case "query":
      return Array.isArray(query[has.key]) ? fromSource(query[has.key].join(",")) : fromSource(query[has.key] ?? "");
    case "host":
      return fromSource(headers.host ?? "");
  }
};
function convertMatch(match2, toDestination, destination) {
  if (!match2) {
    return destination;
  }
  const { params } = match2;
  const isUsingParams = Object.keys(params).length > 0;
  return isUsingParams ? toDestination(params) : destination;
}
function getNextConfigHeaders(event, configHeaders) {
  if (!configHeaders) {
    return {};
  }
  const matcher = routeHasMatcher(event.headers, event.cookies, event.query);
  const requestHeaders = {};
  const localizedRawPath = localizePath(event);
  for (const { headers, has, missing, regex, source, locale } of configHeaders) {
    const path3 = locale === false ? event.rawPath : localizedRawPath;
    if (new RegExp(regex).test(path3) && checkHas(matcher, has) && checkHas(matcher, missing, true)) {
      const fromSource = match(source);
      const _match = fromSource(path3);
      headers.forEach((h) => {
        try {
          const key = convertMatch(_match, compile(h.key), h.key);
          const value = convertMatch(_match, compile(h.value), h.value);
          requestHeaders[key] = value;
        } catch {
          debug(`Error matching header ${h.key} with value ${h.value}`);
          requestHeaders[h.key] = h.value;
        }
      });
    }
  }
  return requestHeaders;
}
function handleRewrites(event, rewrites) {
  const { rawPath, headers, query, cookies, url } = event;
  const localizedRawPath = localizePath(event);
  const matcher = routeHasMatcher(headers, cookies, query);
  const computeHas = computeParamHas(headers, cookies, query);
  const rewrite = rewrites.find((route) => {
    const path3 = route.locale === false ? rawPath : localizedRawPath;
    return new RegExp(route.regex).test(path3) && checkHas(matcher, route.has) && checkHas(matcher, route.missing, true);
  });
  let finalQuery = query;
  let rewrittenUrl = url;
  const isExternalRewrite = isExternal(rewrite?.destination);
  debug("isExternalRewrite", isExternalRewrite);
  if (rewrite) {
    const { pathname, protocol, hostname, queryString } = getUrlParts(rewrite.destination, isExternalRewrite);
    const pathToUse = rewrite.locale === false ? rawPath : localizedRawPath;
    debug("urlParts", { pathname, protocol, hostname, queryString });
    const toDestinationPath = compile(escapeRegex(pathname, { isPath: true }));
    const toDestinationHost = compile(escapeRegex(hostname));
    const toDestinationQuery = compile(escapeRegex(queryString));
    const params = {
      // params for the source
      ...getParamsFromSource(match(escapeRegex(rewrite.source, { isPath: true })))(pathToUse),
      // params for the has
      ...rewrite.has?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {}),
      // params for the missing
      ...rewrite.missing?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {})
    };
    const isUsingParams = Object.keys(params).length > 0;
    let rewrittenQuery = queryString;
    let rewrittenHost = hostname;
    let rewrittenPath = pathname;
    if (isUsingParams) {
      rewrittenPath = unescapeRegex(toDestinationPath(params));
      rewrittenHost = unescapeRegex(toDestinationHost(params));
      rewrittenQuery = unescapeRegex(toDestinationQuery(params));
    }
    if (NextConfig.i18n && !isExternalRewrite) {
      const strippedPathLocale = rewrittenPath.replace(new RegExp(`^/(${NextConfig.i18n.locales.join("|")})`), "");
      if (strippedPathLocale.startsWith("/api/")) {
        rewrittenPath = strippedPathLocale;
      }
    }
    rewrittenUrl = isExternalRewrite ? `${protocol}//${rewrittenHost}${rewrittenPath}` : new URL(rewrittenPath, event.url).href;
    finalQuery = {
      ...query,
      ...convertFromQueryString(rewrittenQuery)
    };
    rewrittenUrl += convertToQueryString(finalQuery);
    debug("rewrittenUrl", { rewrittenUrl, finalQuery, isUsingParams });
  }
  return {
    internalEvent: {
      ...event,
      query: finalQuery,
      rawPath: new URL(rewrittenUrl).pathname,
      url: rewrittenUrl
    },
    __rewrite: rewrite,
    isExternalRewrite
  };
}
function handleRepeatedSlashRedirect(event) {
  if (event.rawPath.match(/(\\|\/\/)/)) {
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: normalizeRepeatedSlashes(new URL(event.url))
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}
function handleTrailingSlashRedirect(event) {
  const url = new URL(event.rawPath, "http://localhost");
  if (
    // Someone is trying to redirect to a different origin, let's not do that
    url.host !== "localhost" || NextConfig.skipTrailingSlashRedirect || // We should not apply trailing slash redirect to API routes
    event.rawPath.startsWith("/api/")
  ) {
    return false;
  }
  const emptyBody = emptyReadableStream();
  if (NextConfig.trailingSlash && !event.headers["x-nextjs-data"] && !event.rawPath.endsWith("/") && !event.rawPath.match(/[\w-]+\.[\w]+$/g)) {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0]}/${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  if (!NextConfig.trailingSlash && event.rawPath.endsWith("/") && event.rawPath !== "/") {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0].replace(/\/$/, "")}${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  return false;
}
function handleRedirects(event, redirects) {
  const repeatedSlashRedirect = handleRepeatedSlashRedirect(event);
  if (repeatedSlashRedirect)
    return repeatedSlashRedirect;
  const trailingSlashRedirect = handleTrailingSlashRedirect(event);
  if (trailingSlashRedirect)
    return trailingSlashRedirect;
  const localeRedirect = handleLocaleRedirect(event);
  if (localeRedirect)
    return localeRedirect;
  const { internalEvent, __rewrite } = handleRewrites(event, redirects.filter((r) => !r.internal));
  if (__rewrite && !__rewrite.internal) {
    return {
      type: event.type,
      statusCode: __rewrite.statusCode ?? 308,
      headers: {
        Location: internalEvent.url
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
}
function fixDataPage(internalEvent, buildId) {
  const { rawPath, query } = internalEvent;
  const basePath = NextConfig.basePath ?? "";
  const dataPattern = `${basePath}/_next/data/${buildId}`;
  if (rawPath.startsWith("/_next/data") && !rawPath.startsWith(dataPattern)) {
    return {
      type: internalEvent.type,
      statusCode: 404,
      body: toReadableStream("{}"),
      headers: {
        "Content-Type": "application/json"
      },
      isBase64Encoded: false
    };
  }
  if (rawPath.startsWith(dataPattern) && rawPath.endsWith(".json")) {
    const newPath = `${basePath}${rawPath.slice(dataPattern.length, -".json".length).replace(/^\/index$/, "/")}`;
    query.__nextDataReq = "1";
    return {
      ...internalEvent,
      rawPath: newPath,
      query,
      url: new URL(`${newPath}${convertToQueryString(query)}`, internalEvent.url).href
    };
  }
  return internalEvent;
}
function handleFallbackFalse(internalEvent, prerenderManifest) {
  const { rawPath } = internalEvent;
  const { dynamicRoutes, routes } = prerenderManifest;
  const prerenderedFallbackRoutes = Object.entries(dynamicRoutes).filter(([, { fallback }]) => fallback === false);
  const routeFallback = prerenderedFallbackRoutes.some(([, { routeRegex }]) => {
    const routeRegexExp = new RegExp(routeRegex);
    return routeRegexExp.test(rawPath);
  });
  const locales = NextConfig.i18n?.locales;
  const routesAlreadyHaveLocale = locales?.includes(rawPath.split("/")[1]) || // If we don't use locales, we don't need to add the default locale
  locales === void 0;
  let localizedPath = routesAlreadyHaveLocale ? rawPath : `/${NextConfig.i18n?.defaultLocale}${rawPath}`;
  if (
    // Not if localizedPath is "/" tho, because that would not make it find `isPregenerated` below since it would be try to match an empty string.
    localizedPath !== "/" && NextConfig.trailingSlash && localizedPath.endsWith("/")
  ) {
    localizedPath = localizedPath.slice(0, -1);
  }
  const matchedStaticRoute = staticRouteMatcher(localizedPath);
  const prerenderedFallbackRoutesName = prerenderedFallbackRoutes.map(([name]) => name);
  const matchedDynamicRoute = dynamicRouteMatcher(localizedPath).filter(({ route }) => !prerenderedFallbackRoutesName.includes(route));
  const isPregenerated = Object.keys(routes).includes(localizedPath);
  if (routeFallback && !isPregenerated && matchedStaticRoute.length === 0 && matchedDynamicRoute.length === 0) {
    return {
      event: {
        ...internalEvent,
        rawPath: "/404",
        url: constructNextUrl(internalEvent.url, "/404"),
        headers: {
          ...internalEvent.headers,
          "x-invoke-status": "404"
        }
      },
      isISR: false
    };
  }
  return {
    event: internalEvent,
    isISR: routeFallback || isPregenerated
  };
}

// node_modules/@opennextjs/aws/dist/core/routing/middleware.js
init_stream();
init_utils();
var middlewareManifest = MiddlewareManifest;
var functionsConfigManifest = FunctionsConfigManifest;
var middleMatch = getMiddlewareMatch(middlewareManifest, functionsConfigManifest);
var REDIRECTS = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
function defaultMiddlewareLoader() {
  return Promise.resolve().then(() => (init_edgeFunctionHandler(), edgeFunctionHandler_exports));
}
async function handleMiddleware(internalEvent, initialSearch, middlewareLoader = defaultMiddlewareLoader) {
  const headers = internalEvent.headers;
  if (headers["x-isr"] && headers["x-prerender-revalidate"] === PrerenderManifest.preview.previewModeId)
    return internalEvent;
  const normalizedPath = localizePath(internalEvent);
  const hasMatch = middleMatch.some((r) => r.test(normalizedPath));
  if (!hasMatch)
    return internalEvent;
  const initialUrl = new URL(normalizedPath, internalEvent.url);
  initialUrl.search = initialSearch;
  const url = initialUrl.href;
  const middleware = await middlewareLoader();
  const result = await middleware.default({
    // `geo` is pre Next 15.
    geo: {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: decodeURIComponent(headers["x-open-next-city"]),
      country: headers["x-open-next-country"],
      region: headers["x-open-next-region"],
      latitude: headers["x-open-next-latitude"],
      longitude: headers["x-open-next-longitude"]
    },
    headers,
    method: internalEvent.method || "GET",
    nextConfig: {
      basePath: NextConfig.basePath,
      i18n: NextConfig.i18n,
      trailingSlash: NextConfig.trailingSlash
    },
    url,
    body: convertBodyToReadableStream(internalEvent.method, internalEvent.body)
  });
  const statusCode = result.status;
  const responseHeaders = result.headers;
  const reqHeaders = {};
  const resHeaders = {};
  const filteredHeaders = [
    "x-middleware-override-headers",
    "x-middleware-next",
    "x-middleware-rewrite",
    // We need to drop `content-encoding` because it will be decoded
    "content-encoding"
  ];
  const xMiddlewareKey = "x-middleware-request-";
  responseHeaders.forEach((value, key) => {
    if (key.startsWith(xMiddlewareKey)) {
      const k = key.substring(xMiddlewareKey.length);
      reqHeaders[k] = value;
    } else {
      if (filteredHeaders.includes(key.toLowerCase()))
        return;
      if (key.toLowerCase() === "set-cookie") {
        resHeaders[key] = resHeaders[key] ? [...resHeaders[key], value] : [value];
      } else if (REDIRECTS.has(statusCode) && key.toLowerCase() === "location") {
        resHeaders[key] = normalizeLocationHeader(value, internalEvent.url);
      } else {
        resHeaders[key] = value;
      }
    }
  });
  const rewriteUrl = responseHeaders.get("x-middleware-rewrite");
  let isExternalRewrite = false;
  let middlewareQuery = internalEvent.query;
  let newUrl = internalEvent.url;
  if (rewriteUrl) {
    newUrl = rewriteUrl;
    if (isExternal(newUrl, internalEvent.headers.host)) {
      isExternalRewrite = true;
    } else {
      const rewriteUrlObject = new URL(rewriteUrl);
      middlewareQuery = getQueryFromSearchParams(rewriteUrlObject.searchParams);
      if ("__nextDataReq" in internalEvent.query) {
        middlewareQuery.__nextDataReq = internalEvent.query.__nextDataReq;
      }
    }
  }
  if (!rewriteUrl && !responseHeaders.get("x-middleware-next")) {
    const body = result.body ?? emptyReadableStream();
    return {
      type: internalEvent.type,
      statusCode,
      headers: resHeaders,
      body,
      isBase64Encoded: false
    };
  }
  return {
    responseHeaders: resHeaders,
    url: newUrl,
    rawPath: new URL(newUrl).pathname,
    type: internalEvent.type,
    headers: { ...internalEvent.headers, ...reqHeaders },
    body: internalEvent.body,
    method: internalEvent.method,
    query: middlewareQuery,
    cookies: internalEvent.cookies,
    remoteAddress: internalEvent.remoteAddress,
    isExternalRewrite,
    rewriteStatusCode: statusCode
  };
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
var MIDDLEWARE_HEADER_PREFIX = "x-middleware-response-";
var MIDDLEWARE_HEADER_PREFIX_LEN = MIDDLEWARE_HEADER_PREFIX.length;
var INTERNAL_HEADER_PREFIX = "x-opennext-";
var INTERNAL_HEADER_INITIAL_URL = `${INTERNAL_HEADER_PREFIX}initial-url`;
var INTERNAL_HEADER_LOCALE = `${INTERNAL_HEADER_PREFIX}locale`;
var INTERNAL_HEADER_RESOLVED_ROUTES = `${INTERNAL_HEADER_PREFIX}resolved-routes`;
var INTERNAL_HEADER_REWRITE_STATUS_CODE = `${INTERNAL_HEADER_PREFIX}rewrite-status-code`;
var INTERNAL_EVENT_REQUEST_ID = `${INTERNAL_HEADER_PREFIX}request-id`;
var geoHeaderToNextHeader = {
  "x-open-next-city": "x-vercel-ip-city",
  "x-open-next-country": "x-vercel-ip-country",
  "x-open-next-region": "x-vercel-ip-country-region",
  "x-open-next-latitude": "x-vercel-ip-latitude",
  "x-open-next-longitude": "x-vercel-ip-longitude"
};
function applyMiddlewareHeaders(eventOrResult, middlewareHeaders) {
  const isResult = isInternalResult(eventOrResult);
  const headers = eventOrResult.headers;
  const keyPrefix = isResult ? "" : MIDDLEWARE_HEADER_PREFIX;
  Object.entries(middlewareHeaders).forEach(([key, value]) => {
    if (value) {
      headers[keyPrefix + key] = Array.isArray(value) ? value.join(",") : value;
    }
  });
}
async function routingHandler(event, { assetResolver }) {
  try {
    for (const [openNextGeoName, nextGeoName] of Object.entries(geoHeaderToNextHeader)) {
      const value = event.headers[openNextGeoName];
      if (value) {
        event.headers[nextGeoName] = value;
      }
    }
    for (const key of Object.keys(event.headers)) {
      if (key.startsWith(INTERNAL_HEADER_PREFIX) || key.startsWith(MIDDLEWARE_HEADER_PREFIX)) {
        delete event.headers[key];
      }
    }
    let headers = getNextConfigHeaders(event, ConfigHeaders);
    let eventOrResult = fixDataPage(event, BuildId);
    if (isInternalResult(eventOrResult)) {
      return eventOrResult;
    }
    const redirect = handleRedirects(eventOrResult, RoutesManifest.redirects);
    if (redirect) {
      redirect.headers.Location = normalizeLocationHeader(redirect.headers.Location, event.url, true);
      debug("redirect", redirect);
      return redirect;
    }
    const middlewareEventOrResult = await handleMiddleware(
      eventOrResult,
      // We need to pass the initial search without any decoding
      // TODO: we'd need to refactor InternalEvent to include the initial querystring directly
      // Should be done in another PR because it is a breaking change
      new URL(event.url).search
    );
    if (isInternalResult(middlewareEventOrResult)) {
      return middlewareEventOrResult;
    }
    headers = {
      ...middlewareEventOrResult.responseHeaders,
      ...headers
    };
    let isExternalRewrite = middlewareEventOrResult.isExternalRewrite ?? false;
    eventOrResult = middlewareEventOrResult;
    if (!isExternalRewrite) {
      const beforeRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.beforeFiles);
      eventOrResult = beforeRewrite.internalEvent;
      isExternalRewrite = beforeRewrite.isExternalRewrite;
      if (!isExternalRewrite) {
        const assetResult = await assetResolver?.maybeGetAssetResult?.(eventOrResult);
        if (assetResult) {
          applyMiddlewareHeaders(assetResult, headers);
          return assetResult;
        }
      }
    }
    const foundStaticRoute = staticRouteMatcher(eventOrResult.rawPath);
    const isStaticRoute = !isExternalRewrite && foundStaticRoute.length > 0;
    if (!(isStaticRoute || isExternalRewrite)) {
      const afterRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.afterFiles);
      eventOrResult = afterRewrite.internalEvent;
      isExternalRewrite = afterRewrite.isExternalRewrite;
    }
    let isISR = false;
    if (!isExternalRewrite) {
      const fallbackResult = handleFallbackFalse(eventOrResult, PrerenderManifest);
      eventOrResult = fallbackResult.event;
      isISR = fallbackResult.isISR;
    }
    const foundDynamicRoute = dynamicRouteMatcher(eventOrResult.rawPath);
    const isDynamicRoute = !isExternalRewrite && foundDynamicRoute.length > 0;
    if (!(isDynamicRoute || isStaticRoute || isExternalRewrite)) {
      const fallbackRewrites = handleRewrites(eventOrResult, RoutesManifest.rewrites.fallback);
      eventOrResult = fallbackRewrites.internalEvent;
      isExternalRewrite = fallbackRewrites.isExternalRewrite;
    }
    const isNextImageRoute = eventOrResult.rawPath.startsWith("/_next/image");
    const isRouteFoundBeforeAllRewrites = isStaticRoute || isDynamicRoute || isExternalRewrite;
    if (!(isRouteFoundBeforeAllRewrites || isNextImageRoute || // We need to check again once all rewrites have been applied
    staticRouteMatcher(eventOrResult.rawPath).length > 0 || dynamicRouteMatcher(eventOrResult.rawPath).length > 0)) {
      eventOrResult = {
        ...eventOrResult,
        rawPath: "/404",
        url: constructNextUrl(eventOrResult.url, "/404"),
        headers: {
          ...eventOrResult.headers,
          "x-middleware-response-cache-control": "private, no-cache, no-store, max-age=0, must-revalidate"
        }
      };
    }
    if (globalThis.openNextConfig.dangerous?.enableCacheInterception && !isInternalResult(eventOrResult)) {
      debug("Cache interception enabled");
      eventOrResult = await cacheInterceptor(eventOrResult);
      if (isInternalResult(eventOrResult)) {
        applyMiddlewareHeaders(eventOrResult, headers);
        return eventOrResult;
      }
    }
    applyMiddlewareHeaders(eventOrResult, headers);
    const resolvedRoutes = [
      ...foundStaticRoute,
      ...foundDynamicRoute
    ];
    debug("resolvedRoutes", resolvedRoutes);
    return {
      internalEvent: eventOrResult,
      isExternalRewrite,
      origin: false,
      isISR,
      resolvedRoutes,
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(eventOrResult, NextConfig.i18n) : void 0,
      rewriteStatusCode: middlewareEventOrResult.rewriteStatusCode
    };
  } catch (e) {
    error("Error in routingHandler", e);
    return {
      internalEvent: {
        type: "core",
        method: "GET",
        rawPath: "/500",
        url: constructNextUrl(event.url, "/500"),
        headers: {
          ...event.headers
        },
        query: event.query,
        cookies: event.cookies,
        remoteAddress: event.remoteAddress
      },
      isExternalRewrite: false,
      origin: false,
      isISR: false,
      resolvedRoutes: [],
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(event, NextConfig.i18n) : void 0
    };
  }
}
function isInternalResult(eventOrResult) {
  return eventOrResult != null && "statusCode" in eventOrResult;
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
globalThis.internalFetch = fetch;
globalThis.__openNextAls = new AsyncLocalStorage();
var defaultHandler = async (internalEvent, options) => {
  const middlewareConfig = globalThis.openNextConfig.middleware;
  const originResolver = await resolveOriginResolver(middlewareConfig?.originResolver);
  const externalRequestProxy = await resolveProxyRequest(middlewareConfig?.override?.proxyExternalRequest);
  const assetResolver = await resolveAssetResolver(middlewareConfig?.assetResolver);
  const requestId = Math.random().toString(36);
  return runWithOpenNextRequestContext({
    isISRRevalidation: internalEvent.headers["x-isr"] === "1",
    waitUntil: options?.waitUntil,
    requestId
  }, async () => {
    const result = await routingHandler(internalEvent, { assetResolver });
    if ("internalEvent" in result) {
      debug("Middleware intercepted event", internalEvent);
      if (!result.isExternalRewrite) {
        const origin = await originResolver.resolve(result.internalEvent.rawPath);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_HEADER_INITIAL_URL]: internalEvent.url,
              [INTERNAL_HEADER_RESOLVED_ROUTES]: JSON.stringify(result.resolvedRoutes),
              [INTERNAL_EVENT_REQUEST_ID]: requestId,
              [INTERNAL_HEADER_REWRITE_STATUS_CODE]: String(result.rewriteStatusCode)
            }
          },
          isExternalRewrite: result.isExternalRewrite,
          origin,
          isISR: result.isISR,
          initialURL: result.initialURL,
          resolvedRoutes: result.resolvedRoutes
        };
      }
      try {
        return externalRequestProxy.proxy(result.internalEvent);
      } catch (e) {
        error("External request failed.", e);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_EVENT_REQUEST_ID]: requestId
            },
            rawPath: "/500",
            url: constructNextUrl(result.internalEvent.url, "/500"),
            method: "GET"
          },
          // On error we need to rewrite to the 500 page which is an internal rewrite
          isExternalRewrite: false,
          origin: false,
          isISR: result.isISR,
          initialURL: result.internalEvent.url,
          resolvedRoutes: [{ route: "/500", type: "page" }]
        };
      }
    }
    result.headers[INTERNAL_EVENT_REQUEST_ID] = requestId;
    debug("Middleware response", result);
    return result;
  });
};
var handler2 = await createGenericHandler({
  handler: defaultHandler,
  type: "middleware"
});
var middleware_default = {
  fetch: handler2
};
export {
  middleware_default as default,
  handler2 as handler
};
