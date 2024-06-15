function generateUnixTime() {
    const year = document.getElementById("year").value;
    const month = document.getElementById("month").value;
    const day = document.getElementById("day").value;
    const hour = document.getElementById("hour").value;
    const minute = document.getElementById("minute").value;
    const second = document.getElementById("second").value;

    const date = new Date(Date.UTC(year, month, day, hour, minute, second));
    const unixTime = Math.floor(date.getTime() / 1000);

    document.getElementById("unix-time").innerHTML = `Unix Time: ${unixTime}`;
  }