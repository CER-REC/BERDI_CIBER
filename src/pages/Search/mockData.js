export default {
  root: {
    name: 'nivo',
    color: 'hsl(263, 70%, 50%)',
    children: [
      {
        name: 'viz',
        color: 'hsl(276, 70%, 50%)',
        children: [
          {
            name: 'stack',
            color: 'hsl(70, 70%, 50%)',
            children: [
              {
                name: 'cchart',
                color: 'hsl(291, 70%, 50%)',
                loc: 148678,
              },
              {
                name: 'xAxis',
                color: 'hsl(194, 70%, 50%)',
                loc: 15277,
              },
              {
                name: 'yAxis',
                color: 'hsl(114, 70%, 50%)',
                loc: 85902,
              },
              {
                name: 'layers',
                color: 'hsl(248, 70%, 50%)',
                loc: 133133,
              },
            ],
          },
          {
            name: 'ppie',
            color: 'hsl(243, 70%, 50%)',
            children: [
              {
                name: 'chart',
                color: 'hsl(95, 70%, 50%)',
                children: [
                  {
                    name: 'pie',
                    color: 'hsl(345, 70%, 50%)',
                    children: [
                      {
                        name: 'outline',
                        color: 'hsl(145, 70%, 50%)',
                        loc: 152109,
                      },
                      {
                        name: 'slices',
                        color: 'hsl(268, 70%, 50%)',
                        loc: 153369,
                      },
                      {
                        name: 'bbox',
                        color: 'hsl(223, 70%, 50%)',
                        loc: 127504,
                      },
                    ],
                  },
                  {
                    name: 'donut',
                    color: 'hsl(95, 70%, 50%)',
                    loc: 16893,
                  },
                  {
                    name: 'gauge',
                    color: 'hsl(183, 70%, 50%)',
                    loc: 110506,
                  },
                ],
              },
              {
                name: 'legends',
                color: 'hsl(251, 70%, 50%)',
                loc: 140354,
              },
            ],
          },
        ],
      },
      {
        name: 'colors',
        color: 'hsl(358, 70%, 50%)',
        children: [
          {
            name: 'rgb',
            color: 'hsl(125, 70%, 50%)',
            loc: 65010,
          },
          {
            name: 'hsl',
            color: 'hsl(127, 70%, 50%)',
            loc: 125465,
          },
        ],
      },
      {
        name: 'utils',
        color: 'hsl(15, 70%, 50%)',
        children: [
          {
            name: 'randomize',
            color: 'hsl(21, 70%, 50%)',
            loc: 110658,
          },
          {
            name: 'resetClock',
            color: 'hsl(87, 70%, 50%)',
            loc: 70751,
          },
          {
            name: 'noop',
            color: 'hsl(189, 70%, 50%)',
            loc: 95736,
          },
          {
            name: 'tick',
            color: 'hsl(90, 70%, 50%)',
            loc: 83306,
          },
          {
            name: 'forceGC',
            color: 'hsl(333, 70%, 50%)',
            loc: 109795,
          },
          {
            name: 'stackTrace',
            color: 'hsl(323, 70%, 50%)',
            loc: 24105,
          },
          {
            name: 'dbg',
            color: 'hsl(266, 70%, 50%)',
            loc: 20462,
          },
        ],
      },
      {
        name: 'generators',
        color: 'hsl(244, 70%, 50%)',
        children: [
          {
            name: 'address',
            color: 'hsl(88, 70%, 50%)',
            loc: 15837,
          },
          {
            name: 'city',
            color: 'hsl(306, 70%, 50%)',
            loc: 45957,
          },
          {
            name: 'animal',
            color: 'hsl(126, 70%, 50%)',
            loc: 52813,
          },
          {
            name: 'movie',
            color: 'hsl(1, 70%, 50%)',
            loc: 133061,
          },
          {
            name: 'user',
            color: 'hsl(266, 70%, 50%)',
            loc: 52359,
          },
        ],
      },
      {
        name: 'set',
        color: 'hsl(187, 70%, 50%)',
        children: [
          {
            name: 'clone',
            color: 'hsl(270, 70%, 50%)',
            loc: 66728,
          },
          {
            name: 'intersect',
            color: 'hsl(3, 70%, 50%)',
            loc: 81128,
          },
          {
            name: 'merge',
            color: 'hsl(285, 70%, 50%)',
            loc: 112406,
          },
          {
            name: 'reverse',
            color: 'hsl(22, 70%, 50%)',
            loc: 168324,
          },
          {
            name: 'toArray',
            color: 'hsl(296, 70%, 50%)',
            loc: 59556,
          },
          {
            name: 'toObject',
            color: 'hsl(197, 70%, 50%)',
            loc: 190286,
          },
          {
            name: 'fromCSV',
            color: 'hsl(18, 70%, 50%)',
            loc: 56196,
          },
          {
            name: 'slice',
            color: 'hsl(257, 70%, 50%)',
            loc: 11279,
          },
          {
            name: 'append',
            color: 'hsl(73, 70%, 50%)',
            loc: 20903,
          },
          {
            name: 'prepend',
            color: 'hsl(276, 70%, 50%)',
            loc: 146894,
          },
          {
            name: 'shuffle',
            color: 'hsl(334, 70%, 50%)',
            loc: 40293,
          },
          {
            name: 'pick',
            color: 'hsl(120, 70%, 50%)',
            loc: 187722,
          },
          {
            name: 'plouc',
            color: 'hsl(177, 70%, 50%)',
            loc: 128385,
          },
        ],
      },
      {
        name: 'text',
        color: 'hsl(302, 70%, 50%)',
        children: [
          {
            name: 'trim',
            color: 'hsl(344, 70%, 50%)',
            loc: 166891,
          },
          {
            name: 'slugify',
            color: 'hsl(320, 70%, 50%)',
            loc: 5695,
          },
          {
            name: 'snakeCase',
            color: 'hsl(309, 70%, 50%)',
            loc: 151768,
          },
          {
            name: 'camelCase',
            color: 'hsl(355, 70%, 50%)',
            loc: 4636,
          },
          {
            name: 'repeat',
            color: 'hsl(358, 70%, 50%)',
            loc: 20191,
          },
          {
            name: 'padLeft',
            color: 'hsl(89, 70%, 50%)',
            loc: 26783,
          },
          {
            name: 'padRight',
            color: 'hsl(67, 70%, 50%)',
            loc: 1061,
          },
          {
            name: 'sanitize',
            color: 'hsl(315, 70%, 50%)',
            loc: 78071,
          },
          {
            name: 'ploucify',
            color: 'hsl(45, 70%, 50%)',
            loc: 163134,
          },
        ],
      },
      {
        name: 'misc',
        color: 'hsl(128, 70%, 50%)',
        children: [
          {
            name: 'greetings',
            color: 'hsl(184, 70%, 50%)',
            children: [
              {
                name: 'hey',
                color: 'hsl(184, 70%, 50%)',
                loc: 64577,
              },
              {
                name: 'HOWDY',
                color: 'hsl(315, 70%, 50%)',
                loc: 19568,
              },
              {
                name: 'aloha',
                color: 'hsl(44, 70%, 50%)',
                loc: 131071,
              },
              {
                name: 'AHOY',
                color: 'hsl(348, 70%, 50%)',
                loc: 92190,
              },
            ],
          },
          {
            name: 'other',
            color: 'hsl(229, 70%, 50%)',
            loc: 45418,
          },
          {
            name: 'path',
            color: 'hsl(136, 70%, 50%)',
            children: [
              {
                name: 'pathA',
                color: 'hsl(270, 70%, 50%)',
                loc: 169680,
              },
              {
                name: 'pathB',
                color: 'hsl(142, 70%, 50%)',
                children: [
                  {
                    name: 'pathB1',
                    color: 'hsl(278, 70%, 50%)',
                    loc: 134119,
                  },
                  {
                    name: 'pathB2',
                    color: 'hsl(92, 70%, 50%)',
                    loc: 48085,
                  },
                  {
                    name: 'pathB3',
                    color: 'hsl(214, 70%, 50%)',
                    loc: 85520,
                  },
                  {
                    name: 'pathB4',
                    color: 'hsl(243, 70%, 50%)',
                    loc: 79780,
                  },
                ],
              },
              {
                name: 'pathC',
                color: 'hsl(229, 70%, 50%)',
                children: [
                  {
                    name: 'pathC1',
                    color: 'hsl(30, 70%, 50%)',
                    loc: 26333,
                  },
                  {
                    name: 'pathC2',
                    color: 'hsl(119, 70%, 50%)',
                    loc: 162408,
                  },
                  {
                    name: 'pathC3',
                    color: 'hsl(102, 70%, 50%)',
                    loc: 29379,
                  },
                  {
                    name: 'pathC4',
                    color: 'hsl(9, 70%, 50%)',
                    loc: 85691,
                  },
                  {
                    name: 'pathC5',
                    color: 'hsl(183, 70%, 50%)',
                    loc: 108999,
                  },
                  {
                    name: 'pathC6',
                    color: 'hsl(312, 70%, 50%)',
                    loc: 158836,
                  },
                  {
                    name: 'pathC7',
                    color: 'hsl(147, 70%, 50%)',
                    loc: 71502,
                  },
                  {
                    name: 'pathC8',
                    color: 'hsl(303, 70%, 50%)',
                    loc: 108418,
                  },
                  {
                    name: 'pathC9',
                    color: 'hsl(27, 70%, 50%)',
                    loc: 105933,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};
