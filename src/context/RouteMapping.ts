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
  "/trigger-warning": "/inspired-by-DAE",
  "/inspired-by-DAE": "/2",

  // Scene 3
  "/3-0": "/3-1",
  "/3-2": "/3-3",
  "/3-3-1": "/3-4",
  "/3-4": "/4-1",

  // Scene 4
  "/4-1-1": "/4-2",
  "/4-1-2": "/4-2",
  "/4-2": "/5-0",

  // Scene 5
  "/5-0": "/5-1",
  "/5-1": "/5-2",
  "/5-2": "/5-3",
  "/5-3": "/5-4",

  // Scene 5-5
  "/5-5-1": "/5-5-2",
  "/5-5-2": "/5-5-3",

  // Scene 6
  "/6-0": "/6-1",
  "/6-1": "/6-2",
  "/6-2": "/6-3",
  "/6-4": "/7-0",

  // Scene 7
  "/7-0": "/7-1",
  "/7-1": "/7-1-1",
  "/7-1-1": "/7-1-2",
  "/7-1-2": "/7-2",
  "/7-2": "/7-2-1",
  "/7-2-1": "/7-2-2",
  "/7-2-2": "/7-3",
  "/7-3": "/7-3-1",
  "/7-3-1": "/7-3-2",
  "/7-3-2": "/8-0",

  // Scene 8
  "/8-0": "/8-1",
  "/8-1": "/8-2",
  "/8-2": "/9-0",

  // Scene 9
  "/9-0": "/10-0",

  // Scene 10
  "/10-0": "/11-0",

  // Scene 11
  "/11-0": "/12-0",

  // Scene 12
  "/12-0": "/13-0",

  // Scene 13
  "/13-1": "/14-0",
  "/13-2": "/14-0",
  "/13-3": "/14-0",

  // Scene 14
  "/14-0": "/14-1",

  // Scene 15
  "/15-0": "/16-0",

  // Scene 17
  "/17-0": "/18-0",

  // Scene 18
  "/18-0": "/18-1",
  "/18-1": "/19-0",

  // Scene 19
  "/19-0": "/19-1",
  "/19-1": "/20-0",

  // Scene 20
  "/20-0": "/21-0",

  // Scene 21
  "/21-0": "/22-0",

  // Scene 22
  "/22-0": "/23-0",

  // Scene 23
  "/23-0": "/24-0",

  // Scene 27
  "/27-0": "/28-0",

  // Scene 28
  "/28-0": "/29-0",

  // Scene 29
  "/29-0": "/pick-a-number",
} as IRouteMapping;
