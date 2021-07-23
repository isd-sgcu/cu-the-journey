/**
 * This file provides the route mapping object
 *
 * Format:
 * { [from]: [to] }
 *
 * Ex. { '/3-0': '/3-1' }
 * This will tell the transition controller to routing
 * from [from] to [to]
 *
 * The component that need to choose or fill the form should not provide
 * in this file, please fill the route name in PreventRoute.ts instead
 */

interface IRouteMapping {
  [k: string]: string;
}

export default {
  "/": "/landing",
  "/3-0": "/3-1",
  "/3-1": "/3-2"
} as IRouteMapping;
