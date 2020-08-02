/**
 * Util functions for our application
 */

// TODO: type checking or unexpected/undefined argument handling (e.g. `Array.isArray` check)
export const filterDataToShowAvailableJobs = (sessionArr) =>
  sessionArr.filter((session) => {
    const sessionStartDate = new Date(session.startDatetime);
    const sessionEndDate = new Date(session.endDatetime);

    return (
      session.staffType === "gp" && // Show only GP jobs TODO: Make this user-selectable?
      session.status === "POSTED" && // Show only jobs that have been posted TODO: Use enum if typed?
      session.locum === null && // Show jobs without a locum
      sessionStartDate.toString() !== "Invalid Date" && // Check that date exists and has been parsed correctly TODO: Use date-fns ?
      sessionEndDate.toString() !== "Invalid Date" && // Same as above. This removes "the pink clinic" from results user sees
      Date.now() < sessionStartDate // Show jobs that start in the future
    );
  });
