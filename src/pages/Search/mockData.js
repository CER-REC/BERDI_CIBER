export default {
  root: {
    name: 'nivo',
    color: 'hsl(10, 70%, 50%)',
    children: [
      {
        name: 'viz',
        color: 'hsl(359, 70%, 50%)',
        children: [
          {
            name: 'stack',
            color: 'hsl(330, 70%, 50%)',
            children: [
              {
                name: 'cchart',
                color: 'hsl(222, 70%, 50%)',
                loc: 87515,
              },
              {
                name: 'xAxis',
                color: 'hsl(335, 70%, 50%)',
                loc: 169233,
              },
              {
                name: 'yAxis',
                color: 'hsl(84, 70%, 50%)',
                loc: 63216,
              },
              {
                name: 'layers',
                color: 'hsl(182, 70%, 50%)',
                loc: 116663,
              },
            ],
          },
          {
            name: 'ppie',
            color: 'hsl(109, 70%, 50%)',
            children: [
              {
                name: 'chart',
                color: 'hsl(344, 70%, 50%)',
                children: [
                  {
                    name: 'pie',
                    color: 'hsl(239, 70%, 50%)',
                    children: [
                      {
                        name: 'outline',
                        color: 'hsl(291, 70%, 50%)',
                        loc: 53086,
                      },
                      {
                        name: 'slices',
                        color: 'hsl(20, 70%, 50%)',
                        loc: 179758,
                      },
                      {
                        name: 'bbox',
                        color: 'hsl(90, 70%, 50%)',
                        loc: 62756,
                      },
                    ],
                  },
                  {
                    name: 'donut',
                    color: 'hsl(173, 70%, 50%)',
                    loc: 68103,
                  },
                  {
                    name: 'gauge',
                    color: 'hsl(301, 70%, 50%)',
                    loc: 119536,
                  },
                ],
              },
              {
                name: 'legends',
                color: 'hsl(326, 70%, 50%)',
                loc: 180195,
              },
            ],
          },
        ],
      },
      {
        name: 'colors',
        color: 'hsl(54, 70%, 50%)',
        children: [
          {
            name: 'rgb',
            color: 'hsl(243, 70%, 50%)',
            loc: 161097,
          },
          {
            name: 'hsl',
            color: 'hsl(294, 70%, 50%)',
            loc: 26238,
          },
        ],
      },
      {
        name: 'utils',
        color: 'hsl(307, 70%, 50%)',
        children: [
          {
            name: 'randomize',
            color: 'hsl(166, 70%, 50%)',
            loc: 182151,
          },
          {
            name: 'resetClock',
            color: 'hsl(164, 70%, 50%)',
            loc: 102682,
          },
          {
            name: 'noop',
            color: 'hsl(238, 70%, 50%)',
            loc: 129533,
          },
          {
            name: 'tick',
            color: 'hsl(59, 70%, 50%)',
            loc: 84597,
          },
          {
            name: 'forceGC',
            color: 'hsl(211, 70%, 50%)',
            loc: 189414,
          },
          {
            name: 'stackTrace',
            color: 'hsl(171, 70%, 50%)',
            loc: 101873,
          },
          {
            name: 'dbg',
            color: 'hsl(175, 70%, 50%)',
            loc: 156804,
          },
        ],
      },
      {
        name: 'generators',
        color: 'hsl(280, 70%, 50%)',
        children: [
          {
            name: 'address',
            color: 'hsl(260, 70%, 50%)',
            loc: 193585,
          },
          {
            name: 'city',
            color: 'hsl(346, 70%, 50%)',
            loc: 86437,
          },
          {
            name: 'animal',
            color: 'hsl(65, 70%, 50%)',
            loc: 69299,
          },
          {
            name: 'movie',
            color: 'hsl(240, 70%, 50%)',
            loc: 139506,
          },
          {
            name: 'user',
            color: 'hsl(56, 70%, 50%)',
            loc: 74138,
          },
        ],
      },
      {
        name: 'set',
        color: 'hsl(198, 70%, 50%)',
        children: [
          {
            name: 'clone',
            color: 'hsl(88, 70%, 50%)',
            loc: 136418,
          },
          {
            name: 'intersect',
            color: 'hsl(343, 70%, 50%)',
            loc: 125953,
          },
          {
            name: 'merge',
            color: 'hsl(349, 70%, 50%)',
            loc: 57359,
          },
          {
            name: 'reverse',
            color: 'hsl(229, 70%, 50%)',
            loc: 48783,
          },
          {
            name: 'toArray',
            color: 'hsl(143, 70%, 50%)',
            loc: 74287,
          },
          {
            name: 'toObject',
            color: 'hsl(30, 70%, 50%)',
            loc: 55676,
          },
          {
            name: 'fromCSV',
            color: 'hsl(304, 70%, 50%)',
            loc: 71769,
          },
          {
            name: 'slice',
            color: 'hsl(227, 70%, 50%)',
            loc: 140549,
          },
          {
            name: 'append',
            color: 'hsl(96, 70%, 50%)',
            loc: 126954,
          },
          {
            name: 'prepend',
            color: 'hsl(326, 70%, 50%)',
            loc: 9186,
          },
          {
            name: 'shuffle',
            color: 'hsl(191, 70%, 50%)',
            loc: 105060,
          },
          {
            name: 'pick',
            color: 'hsl(134, 70%, 50%)',
            loc: 65595,
          },
          {
            name: 'plouc',
            color: 'hsl(319, 70%, 50%)',
            loc: 106635,
          },
        ],
      },
      {
        name: 'text',
        color: 'hsl(38, 70%, 50%)',
        children: [
          {
            name: 'trim',
            color: 'hsl(97, 70%, 50%)',
            loc: 79056,
          },
          {
            name: 'slugify',
            color: 'hsl(181, 70%, 50%)',
            loc: 67454,
          },
          {
            name: 'snakeCase',
            color: 'hsl(267, 70%, 50%)',
            loc: 10927,
          },
          {
            name: 'camelCase',
            color: 'hsl(353, 70%, 50%)',
            loc: 198446,
          },
          {
            name: 'repeat',
            color: 'hsl(70, 70%, 50%)',
            loc: 44156,
          },
          {
            name: 'padLeft',
            color: 'hsl(224, 70%, 50%)',
            loc: 122328,
          },
          {
            name: 'padRight',
            color: 'hsl(199, 70%, 50%)',
            loc: 114244,
          },
          {
            name: 'sanitize',
            color: 'hsl(140, 70%, 50%)',
            loc: 80279,
          },
          {
            name: 'ploucify',
            color: 'hsl(36, 70%, 50%)',
            loc: 105682,
          },
        ],
      },
      {
        name: 'misc',
        color: 'hsl(323, 70%, 50%)',
        children: [
          {
            name: 'greetings',
            color: 'hsl(237, 70%, 50%)',
            children: [
              {
                name: 'hey',
                color: 'hsl(360, 70%, 50%)',
                loc: 113110,
              },
              {
                name: 'HOWDY',
                color: 'hsl(41, 70%, 50%)',
                loc: 9441,
              },
              {
                name: 'aloha',
                color: 'hsl(23, 70%, 50%)',
                loc: 22888,
              },
              {
                name: 'AHOY',
                color: 'hsl(242, 70%, 50%)',
                loc: 25374,
              },
            ],
          },
          {
            name: 'other',
            color: 'hsl(255, 70%, 50%)',
            loc: 103116,
          },
          {
            name: 'path',
            color: 'hsl(350, 70%, 50%)',
            children: [
              {
                name: 'pathA',
                color: 'hsl(257, 70%, 50%)',
                loc: 74992,
              },
              {
                name: 'pathB',
                color: 'hsl(318, 70%, 50%)',
                children: [
                  {
                    name: 'pathB1',
                    color: 'hsl(191, 70%, 50%)',
                    loc: 178894,
                  },
                  {
                    name: 'pathB2',
                    color: 'hsl(203, 70%, 50%)',
                    loc: 69178,
                  },
                  {
                    name: 'pathB3',
                    color: 'hsl(139, 70%, 50%)',
                    loc: 99770,
                  },
                  {
                    name: 'pathB4',
                    color: 'hsl(34, 70%, 50%)',
                    loc: 57414,
                  },
                ],
              },
              {
                name: 'pathC',
                color: 'hsl(187, 70%, 50%)',
                children: [
                  {
                    name: 'pathC1',
                    color: 'hsl(198, 70%, 50%)',
                    loc: 171236,
                  },
                  {
                    name: 'pathC2',
                    color: 'hsl(34, 70%, 50%)',
                    loc: 121555,
                  },
                  {
                    name: 'pathC3',
                    color: 'hsl(76, 70%, 50%)',
                    loc: 9112,
                  },
                  {
                    name: 'pathC4',
                    color: 'hsl(173, 70%, 50%)',
                    loc: 179880,
                  },
                  {
                    name: 'pathC5',
                    color: 'hsl(34, 70%, 50%)',
                    loc: 3572,
                  },
                  {
                    name: 'pathC6',
                    color: 'hsl(171, 70%, 50%)',
                    loc: 186467,
                  },
                  {
                    name: 'pathC7',
                    color: 'hsl(145, 70%, 50%)',
                    loc: 132606,
                  },
                  {
                    name: 'pathC8',
                    color: 'hsl(276, 70%, 50%)',
                    loc: 138523,
                  },
                  {
                    name: 'pathC9',
                    color: 'hsl(200, 70%, 50%)',
                    loc: 58478,
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
