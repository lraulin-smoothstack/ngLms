const foo = () => ({
  propA: 5,
  propB: this.propA,
});

const bar = foo();
console.log(bar.propB);
