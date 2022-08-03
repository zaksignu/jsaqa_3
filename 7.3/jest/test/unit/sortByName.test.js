const sorting = require("../../app");

describe("Books names test suit", () => {
  it("Books names should be sorted in ascending order", () => {
    expect(
      sorting.sortByName([
        "Гарри Поттер",
        "Властелин Колец",
        "Волшебник изумрудного города",
      ])
    ).toEqual([
      "Властелин Колец",
      "Волшебник изумрудного города",
      "Гарри Поттер",
    ]);
  });

  it("Books names with no sorting for 2 of 3", () => {
    expect(
      sorting.sortByName([
        "Гарри Поттер",
        "Гарри Поттер",
        "Волшебник изумрудного города",
      ])
    ).toEqual([
      "Волшебник изумрудного города",
      "Гарри Поттер",
      "Гарри Поттер",
    ]);
  });

});
