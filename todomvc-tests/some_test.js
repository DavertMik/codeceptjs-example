Feature('Some');

async function wait(timeout) {
  return new Promise(res => setTimeout(res, timeout));
}

function waitFor(
  callback,
  maxTries = 10
) {
  const caller = (() => {
    const error = new Error();
    if (!error || !error.stack) return "";

    const stackLines = error.stack.split("\n");
    let result = "";
    for (const [index, line] of stackLines.entries()) {
      // the line caller is beneath this
      if (/Object.waitFor/.test(line)) {
        result = stackLines[index + 1];
        break;
      }
    }
    return result;
  })();


  const waitForAndAccumulateErrors = async (
    callback,
    maxTries,
    accumulatedErrors = []
  ) => {
    const retry = () => {
      throw new Error("waitFor retrying");
    };

    if (maxTries > 0) {
      try {
        await callback(retry);
      } catch (error) {
        if (error instanceof ReferenceError) throw error;
        if (error instanceof Error && error.message != "waitFor retrying") {
          accumulatedErrors.push(error.message);
        }
        maxTries -= 1;
        // await wait(200);
        return waitForAndAccumulateErrors(
          callback,
          maxTries,
          accumulatedErrors
        );
      }
    } else {
      let errorMessage = "waitFor() has exceeded the maxTries";
      if (accumulatedErrors.length > 0) {
        const accumulatedErrorsForPrinting = {};
        for (const e of accumulatedErrors) {
          accumulatedErrorsForPrinting[e] = accumulatedErrorsForPrinting[e]
            ? accumulatedErrorsForPrinting[e] + 1
            : 1;
        }
        errorMessage += ` - AccumulatedErrors {'error': number of occurrences}:\n${JSON.stringify(
          accumulatedErrorsForPrinting,
          null,
          2
        )}`;
      }

      if (caller) {
        errorMessage += `\nCalled ${caller.trim()}\n`;
      }

      throw new Error(errorMessage);
    }
  };

  return waitForAndAccumulateErrors(callback, maxTries, []);
}


Scenario('something', async ({ I }) => {
  I.amOnPage('http://todomvc.com/examples/angularjs/#/')

  await waitFor(async (retry) => {
    const val = await  I.grabTextFrom('//body');
    if (!val.includes('ouch')) {
      await I.wait(0.1);
      console.log('waiting');
      retry();
    }
  })
})
