export default {
  name: 'esa',
  color: 'hsl(0,0%,100%)',
  children: [
    {
      shortName: 'C5',
      color: 'hsl(102,48%,48%)',
      tableCount: 98.91053068421976,
    },
    {
      shortName: 'CONDENSATE',
      color: 'hsl(102,48%,48%)',
      tableCount: 40.14923563038366,
    },
    {
      shortName: 'HEAVY',
      color: 'hsl(102,48%,48%)',
      tableCount: 183.6218663643784,
    },
    {
      shortName: 'ISB',
      color: 'hsl(102,48%,48%)',

      tableCount: 438.39905999999996,
    },
    {
      shortName: 'LIGHT',
      children: [{
        shortName: 'LIGHT',
        color: 'hsl(102,48%,48%)',

        tableCount: 387.5075697903656,
      }],
    },
    {
      name: 'something',
      children: [{
        name: 'something',
        children: [{
          shortName: 'MB',
          color: 'hsl(102,48%,40%)',
          tableCount: 626.46408,
        }],
      }],
    },
  ],
};
