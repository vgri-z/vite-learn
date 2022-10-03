// Uncaught TypeError: Failed to resolve module specifier "lodash". Relative references must start with either "/", "./", or "../".
// 直接导入lodash时，会报这个错误，是因为浏览器不知道项目文件夹下会有一个node_modules目录，所以浏览器无法寻找lodash
import _ from "lodash"; // lodash又会依赖其他的资源，其他的资源可能也会依赖又一些其他的资源等
import lodashES from "lodash-es";

// 假设lodash又依赖的其他的模块，并且这些模块都是用export导出

console.log(_);

export const count = 0;
