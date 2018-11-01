const { expect } = require('chai');
const sinon = require('sinon');
const Console = require('./index');

describe('Console', () => {

  it('it should show execution time if it has exceeded the threshold', async () => {
    const consoleProfile = new Console({ threshold: 50, test: true });
    const showTimeSpy = sinon.spy(consoleProfile, '_showTime');

    consoleProfile.time('test');

    await delay(100);

    consoleProfile.timeEnd('test');

    expect(showTimeSpy.callCount).to.be.equal(1);
    expect(showTimeSpy.args[0][0]).to.be.equal('test');
    expect(showTimeSpy.args[0][1] >= 100).to.be.equal(true);
  });

  it('it should not show execution time if it has not exceeded the threshold', async () => {
    const consoleProfile = new Console({ threshold: 150, test: true });
    const showTimeSpy = sinon.spy(consoleProfile, '_showTime');

    consoleProfile.time('test');

    await delay(100);

    consoleProfile.timeEnd('test');

    expect(showTimeSpy.callCount).to.be.equal(0);
  });
});

function delay(time = 100) {
  return new Promise((res) => {
    setTimeout(res, time);
  })
}