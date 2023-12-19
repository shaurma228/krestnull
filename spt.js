let innerStatus = [0, 0, 0, 
                   0, 0, 0, 
                   0, 0, 0];
let clr = false;

function botMove() {
  let eid;
  let x = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  let y = [[1, 3, 4], [0, 4, 2], [1, 4, 5], [0, 4, 6], [1, 3, 5, 7], [2, 4, 8], [3, 4, 7], [4, 6, 8], [4, 5, 7]];
  let flag = false;
  for(let i = 0; i < 8; i++) {
      if (innerStatus[x[i][0]] == 2 && innerStatus[x[i][1]] == 2 && innerStatus[x[i][2]] == 0) {
        eid = x[i][2];
        console.log("o");
        flag = true;
        break;
      }
      else if (innerStatus[x[i][1]] == 2 && innerStatus[x[i][2]] == 2 && innerStatus[x[i][0]] == 0) {
        eid = x[i][0];
        console.log("o");
        flag = true;
        break;
      }
      else if (innerStatus[x[i][0]] == 2 && innerStatus[x[i][2]] == 2 && innerStatus[x[i][1]] == 0) {
        eid = x[i][1];
        console.log("o");
        flag = true;
        break;
      }
    }

  if (!flag) {
    for(let i = 0; i < 8; i++) {
    if (innerStatus[x[i][0]] == 1 && innerStatus[x[i][1]] == 1 && innerStatus[x[i][2]] == 0) {
      eid = x[i][2];
      console.log("x");
      flag = true;
      break;
    }
    else if (innerStatus[x[i][1]] == 1 && innerStatus[x[i][2]] == 1 && innerStatus[x[i][0]] == 0) {
      eid = x[i][0];
      console.log("x");
      flag = true;
      break;
    }
    else if (innerStatus[x[i][0]] == 1 && innerStatus[x[i][2]] == 1 && innerStatus[x[i][1]] == 0) {
      eid = x[i][1];
      console.log("x");
      flag = true;
      break;
    }
  }
  }
  if (!flag) {
    let n = 3;
    for (let i = 0; i < 9; i++) {
      if (i == 4) {
        n = 4;
      }
      else {
        n = 3;
      }
      for (let j = 0; j < n; j++) {
        if (innerStatus[y[i][j]] == 0) {
          eid = y[i][j];
          console.log("o2");
          flag = true;
          break;
        }
      }
      if (flag) {
        break;
      }
    }
  }
  console.log(flag);
  if (!flag) {
    let eid = Math.floor(Math.random() * 9);
    return eid;
  }
  if (flag) {
    return eid;
  }
}

function check() {
  let x = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  let winner = 0;
  for (let i = 0; i < 8; i++) {
    if (innerStatus[x[i][0]] == 1 && innerStatus[x[i][1]] == 1 && innerStatus[x[i][2]] == 1) {
      winner = 1;
      document.getElementById(x[i][0]).style.color = "#57F09C";
      document.getElementById(x[i][1]).style.color = "#57F09C";
      document.getElementById(x[i][2]).style.color = "#57F09C";
      break;
    }
    if (innerStatus[x[i][0]] == 2 && innerStatus[x[i][1]] == 2 && innerStatus[x[i][2]] == 2) {
      winner = 2;
      document.getElementById(x[i][0]).style.color = "#A33E35";
      document.getElementById(x[i][1]).style.color = "#A33E35";
      document.getElementById(x[i][2]).style.color = "#A33E35";
      break;
    }
  }
  console.log(winner);
  return winner;
}

function checkZero() {
    let f = false;
    for (let i = 0; i < 9; i++) {
        if (innerStatus[i] == 0) {
            f = true;
            break;
        }
    }
    return f;
}

function clear() {
  for (let i = 0; i < 9; i++) {
    innerStatus[i] = 0;
    document.getElementById(i).style.color = "white";
    document.getElementById(i).textContent = "";
  }
}

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('inner')) {
        if (clr) {
            console.log("clearing");
            clear();
            document.body.style.backgroundImage = 'url("https://cdn.akamai.steamstatic.com/steam/apps/570/ss_86d675fdc73ba10462abb8f5ece7791c5047072c.1920x1080.jpg?t=1702685169")';
            clr = false
        }
        else{
        console.log("player move");
        let elid = event.target.id;
        if (innerStatus[elid] == 0) {
            innerStatus[elid] = 1;
            event.target.textContent = 'X';
            console.log(elid);
            console.log(innerStatus);

            if (check() == 0 && checkZero()) {
                console.log("bot move");
                do {
                    elid = botMove();
                } while (innerStatus[elid] != 0)
                innerStatus[elid] = 2;
                document.getElementById(elid).textContent = "O";
                console.log(elid);
                console.log(innerStatus);
            }

            console.log("checking");
            let win = check();
            if (!checkZero() && win == 0) {
                document.body.style.backgroundImage = 'url("data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgWFRYYGBgYHBwYGBoYGBgaGhoYGBoZGRgYGBgcJC4lHB4rHxgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHhISHzQkISE0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0PTQ0NDQxNP/AABEIAOsA1wMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAACAAEDBAUGB//EAEAQAAIBAwIEBAUBBgIIBwAAAAECAAMEERIhBTFBUQYTImEUcYGRoTIHI1Kxs8E1QhU0cnN00fDxJCYzhJK04f/EABkBAAMBAQEAAAAAAAAAAAAAAAABAgMEBf/EACMRAQEAAgEFAQEAAwEAAAAAAAABAhESAyExQVETYRQyUiP/2gAMAwEAAhEDEQA/ANIRCLERnlO0iYsxjGDQA8xjEIsQBiZXrGR33FaNIfvKiqe2cn7CcrxHxsg2pIW932H2l49PLLxE3KTy6eVLzidKkCzuBgE4BBY46Ad55/e8fuKuxfSOybfy3mebZiCx6AnfnyzN8eh/1UXO+nrd7a3qtRprbLruCwpaqy4JVDUbVjl6QZz9bg/FbitcUF0q1sENVVdVAFRC6Yb/ADekT2Ovw4PVsapqKpoayqEDNTzKDIQu4xgHVyPKY/AE1cV4wO62g+9uwm+PSxx8Rlc8q8Wp+GLo29O7Zc06rKiMXGoszlFyp3ALDn23m3T8H3lO4S3akvm1FZ0AqrpKJgMS3Q7jaej+OLZLfh9tTUjRRr2qZ9qbhSSe/pOZsX1hUbiltWCk00oVkZ9sBmZNK/M/2Mq443yUyseWWfArt3rotHLW7BaoNVQASusaTn1bSmKyaA/JSobcb4IyNu+89R8MAG64sCcA1kyew8kZM4LxJ4bWztra6t67XNu1SjhWQBiuQ6FCMZzo04Iz6hMcuhLrTTHrWeVm38K37KGFqVB3AqVaatg8sqCdJ9jvMtdwQRhlZkYEg4ZGKMMjnup3ns9JdVwtXzCuaBHkMcMMuraymen6SfzPF6q/vK3+/r/16kjrdLHHHcX0uplldUXlDsIxor2EEJH0mc2nQYW4/wC0PR2JjbiOCYXYMqMP8zD6wlZxydotZi1xDsc3Nb+P7whxG4HJgfnmD5ntFrEN0uMJ+K3I5EfQmKIuIo934OMdOIjKV9xehRH7yoo9gct9hOc4h47QZFFC3Zn2H25ysennl6ZXKTy7ALKd7xShSyalRF9s5b7TzW/8T3NXm+kfwoNO385lrRZzk536nebY9DX+1Rz34dzf+O0GRRQue7ekfbmZzN/4luap/WVH8KbD8bmV6PDc85o2/Dsb4lf+eHiCY5VirQdjk5PuSZao8Nzzm8lnLCW8nLrX0udP6yaPDwByk1e2JRhjfSwHucHE1fLAhBJn+l2rhI7niHiyza44c61gVomqap0v6NVs1NdXp6sQJDwbxXa0+I8SuGqfu6otzSbS/wC8NOkVcLtzDbTjNBj4M2/yL8Zfh/W3xPj1K54XSos2q4at5lWmVfI1VajtkkYxg9+0i8K8TFveUnuK9XyVSonrerURCQukKpLaeRG0yd4jmTeveUq50ZMdO14B4ns0uOItUraFr1ENNir+pfLCFl9PQ5mf4i49aC1s7S2qPWWhVt2d9DgLSon1OSVAJ5bDPXtOeQHaT7R/5F+JnQn13Z8Y2PxwqeeNHw5TVoqY1+aG0/p543nnobU1RxnS1WsynBGVaq7KcHfcEH6ydRFiZ9TrcprS8Ojxu9olhZhGn2g6TMdtSixG3iJI5w2D7xZghjHUx6A9osCBzjwBNiKLEUNQPP0tXbfB+su0ODseZ2nQUqAAGAPtLVKkB0m+XXvpjj0p7YlLg4EtJYY6TcSmvaSpTXtMr1MquYSMhLX2linR9pf8sR9Akcl8VUUhHCSz5YgtT7RbAjSQ7Yx7iR1LMjcbjuJFWJTeTW12Ty+0qQWdkIUiEKDHkD9jOv4clN0Usihh7TSVF6AfaLaeTz40j2P2ktO3A3YfIf8AOdnxBwiEqAT02nHVqhGS2cxzueOW/J6tTp32HtK+mRW76mB+cuBIXsq9kISNoMsBccoxSI0IBjapYKwCkEoy0EVJMVgBIDZlYR8CIpG0GAFpEbR2iKxipgoJUxQiDFDaUYojvC04gnlziDQULeOMiDqja8xWAes94WqAHiDRhJ5sQrSMmMYJKtlgZZ4VbY35kwLSnkzTrOKSFtOQvQSsfDPLL017M4mgrbzgeH+Lg7lNBXBxnOd506XhK6oZYWXumVdudwRMS9tw2R9Jkcd8Vmi2FTUc4O+ADNLhV61dNZXTHMLJujfdT4bwwksM8s4kT5UkHmJ1FmgU7TL4/a4bWBz5yb3rSZbZWswxVlcnEYPJ0raz5kc1JU1Qg+0NHtaDgxwJWBj6veGh5T6BEUkOsx1qGMkzLGCQBUMcVIKFoigipFAIowUQ8xu8lISkXlxzHzKANBjEGSao2YHuGxFiTW9MuwUTYFFUX0j69TFO6crpkUcjoZeo1gRpYZB2IMgqOd5VdDnYzWYssrs9Xw3TB1oxG+rHymzbadG5mdTujpwTKXxOH06/Sfx7R3d8hoVPDtN2Lvk5Oee0vq6IoRAABtiVheDoZGDk5i76PTQo1DkS1dYZCp+koU9t5K77fzkGx3s3G+nI9pWZROiRpVvrUOMjZh17+xho5l9Y+gQfJB6xNqGQecQYwX2I08coihi1RxUgDYMYwi8PVCiIdccvD2iCQAA8UI0xFDYZK8UIkicUHbMoNw9wOUhai46Ga8Iz5NpeIqee0NLtT1nPNntF5hEOA5OmFUHqIa8pzHnHvJEumHIn7ybhTmTuOFU8Aseu30lyqdtpWsFwiA89Iz84VV+kmQrd1XrDeV3XMmqN7w6eJXpO2ZUQnaRC3HMjJmq9tvI2p46Q2FRCZetgesjp0yenKW6dOK1SwkM+8BZIy7RAlIjM3aVi+DG80x6KgvrbPqHPr7iZvlzaTJle5thzG0VPHLXaszy4hT95ZNMRvLk8miuUMAiWtBgmmecNnpXBjhjJPLJjGme0eyDqMeSKkUWz0tmiJG1qO0nim8culB7VeWBK78OQ9JpuJGRGbJfhCSEcH9QwdsibeIyjcfOGw0kPSV67EGWlUd5VrYzM5FMyvcYIGc5mhSbEoaN8mWlP/aVZ2JfRu8Z1EgDESN6sk1tUHSSASnTr4OJbV8xaCVBJcSNYYisParf0BoLA4ImZZ3Gonf6S5xirhDOUsmdXBzsTv8jKxmyrtqBO8judlMG3lLj1cpT2O5IhYIUcTm04m465kycWPaTcK2mUdCgEE7mYo4v7SynFlxyEnjRyaYHtAIlVeIqYa3qHmSItBLiKAK6n/MIohtbEUQinTHOREhYSYRnEVoQZgtCaCZQXrN9sHpAqrvK9B8N85crJM72pzwzGXf7w6Z3iuBvApncTT0S+BtK1wm8sosCsu0g2aK3qmrQfImBctjftLdldZGQCTCwbbqvJNUr0Dkb84dQkCTYpncZfYCZNJd/rLvFH3Ep0Ty+cueE10dudpm8col1A7bn/AK+s1aI2kdUCTPJ+I5F+FtjIMB+FuOk6zQOwiI9ppstuLa0cc1kehuxnaugPSQvaqekJRuuRDkd4a3DCdFU4eh5iV24avSHanyY4ujFNGpwgdMxQ1D26GKMIWIpUGzGMLEYiKwI3EhaWWEruI4A6sbzUT1LnvMkmTW95oGCM4/lJygnYV3SyNtiJSR9xJLq6Lchj+cgzKngVr0NwJJUUYkdoPTJn5GRTc1fjcyTgq+vGcCDxEQeFPiosv0Tp6VIAx7g7SYCV7jGJC2BxE+qRWVPUR7bmHft6zI6LldxNPSHT0uQkDczK9G9JGAu/4kiZ5nmf+sTOTvtV8CgGPGlXwQTGIhkwI4DEQDCYwTGRooRigF3aPkTjl4hcDA15+Yky8brjmimKYh1WIxSc5T8Qtj1U8fIy2niGn1DL9Mw1Q1/LkFalIKXGaTcnH12k/wAUjcmU/IiKb2FVlMifMsuwgFx3lBXMjYyyQJGydoQNa1/QJM/KVrJ/QB22k1U7GZ3ybn+IH1fWBajDDHtDvV3gUzvNPROsTkJDcjaFbNlV+UC5bAmanNXv6z84kEe7/WfnGUzQmjZS9M+1l0GIhYjYiBjGKgJMaMY2Y4DkRRmMEmAMTFETFK0bBKQWSS494JzIWgZILU5Y1HtHzHyLSj5I7QTbY5Ej5S8xEHSISjSsKzjk5hrxGoOx+Yhml7yErHvadJl4u3VfzCHGB1BEqOkrOseoNOu4Jeq+oA8t/vNd+U5Hw1VC1MfxAj7b/wBp11b9J+UzymqIw7/A5SshjccbFNiNjkfzmRRv3A3+8ud4TvLOp6R8orttpBwtw1NCO0mvOUz9m5+43f6xgN4qjjXElQZ5iadwv20uASvaONztLSuDAGIgOZNkRDBi0SsYjJmSAacYRkxmhaIxWOGaKLEUQYQEcyMVc9JIMSVhj5EcwcRADtAxmEywWEqUGLSPMQjSpAYtKriW5G9MR+E5Fw2toqoT0bf5Had3XGUOJ58UwZ2trWL0lPdRJy+lGPx3ZMe4mABOg8QfpX5/2MwCI54J1vheqCmnqGP53mpffpnMeHKxDle4/I//ACdJdN6fpM7O51yN451nB6yuA3U84dyfW3zxCB23E02ekQpMDsxHyJklKvVT9Ln67yamurlJVpYi2egU+L1xz0n6Yk9Pj7D9SfYyM0ZD8OIbhcWknH065H0lpOKIeTCYD0JGbf2j7Fp1dO6VuoP1h6xOPCY5Rw7jk5+8NE67bvFOVF9UHXMUNBYdh2kTE9JbKiNiRK0qoKjDpJUbPSTFYDQtg0EmRu8LQYDKe0IA5gsIzHHQxiT2l7LuTGRM8N/lIXMae5teduvKdlw23ZKKK3Pr7ZOcTnfD6IamW5genPedgTtJyvoOf8Qj0D5/2mFkToPEzroUZ3Jzj+85iGPgNzgFMvUDDkucn59J0lyvplfhCIqLpxyzt1Ms3DjG+wkZXuHHV8F236mSqvSQvhnYj+I4k6Z7SqrFInyhkmCrGEIqosxaoUYgRHo2qIgRaY0BYY0xA8mSfWLXDadRXa3MUs6o0rkfFYKiMEhkRAGZxSPRFiSxiIbTpCVglZYMbTDZ6T8C4K93XWhTZUOlnd2UsEQFVyFyNTEsABkdT0mh4l8JG3tXuqFwtylJilRWphWUq+hipU4Ol+akcs7zW/Zf/r1T/hz/AFEmTxKrxH4O+VEofA+fc63P/qgee2rSNQGc8tp2dPHG4y2OXPLKZdkr+A6nxdK3FypSrResKnkHbQyjSE1751qc5lC+8GuLI3a11c+b5SoaOkN/4k2wYuHOM7Ny9veei+Df31vY3ZO9K1qUWJ56g1FTn60H+8oeHDRfgtu1yxVGqIxK7nWbzUg5HYtpB9ieU044/Ecsvrz7xZ4Tawqovn+YXRqmQnl6dDKMD1NnOr8TqLHwNUehQduIrTNdUZVNBclnTXoUmoNRxq5DPpJlb9qbVTeAVFVUFBvJKsWLKW9ZbIGlgQvp3GDzO+OpuP8AV+Cf723/APqVZMxxts0dyupXDr4AqPxF7M3GpVpLWat5eDhmwECaiMk9c8gdpR8X+ERaWyXdCubig5C+pNDKWB0v7rlcYwCMidN4wtbt+LOLMViwo0C/k1VpHy9bawSzLkkcveF4+01eB03tSUoU2XKONTkK5paWbUdw5JJ3zjn3rjj8LlfrNu/A9W3u7S2W7BF153q8jGjyUD7LrOrOccxj3gUPBteteXNoboBbZabPVNM5bzUDhRTDdPVvq6Dbed14o/xbhH/vP6CwOC/4pxf/AGLX+i8OGPwcsvrznhPhdKlvXuzeqltRdkWp8M7GoqhfXo1AqCXC43OxmrwDwU1a3oVq915BucLRRKWvJZWddTE9VQtjbHfMHw+P/LNz/tN/UpzqPDHEbevacNRbiktS3amHpsw8wvTo1KRVU55ydWeWATDjj8HPL65Dh3hKvUva1kXRGoKGaroZ1dXxo0JqGCQd8tsVI3g8C8OrcLc1vi1FpbFga60G1VNCB6hFNidIUHsxPQT0PhX+NXn/AA9D+bThP2ecRt/9G31nVr0qNSqaxU1XCjTWorTVgT+rBU5A35bbiLhj8HPL6reJfDz2VRFaoKqVlZqb6dBymnUrKCRnDKQRz32GJkaZ3n7WtlssHkam/caFnn3mkTm6s1l2dPSytx7pQsEiAteF5kzsanKxDEfUDFpHeJNNFC0x4HtZMYyh57d/wI63Dd/wIcC2vA4ilL4hu/4EL4hu/wCBDgNrZWLTKnnt3/Agmu3f8CHAbbfAeKPZ3K11XWNLU6iagpKMVbKE7agyDnsckZHOXfEniVa9rUtLS3agtVmeo9VlJ1M/mOEVWb9T8ySAByHblviG7/gQlrt3/Am0yyxx1Gdwxyu66m08WihZGztrZ0LIy+ZUrKwVqgOqoAMlt2JA2lJPEDLwxLBaDGpTZGFQugQ6K4rD051DIGOXOYIrt3/AiNdu/wCBK/TNP54t/wAWcc+OqpUFJqQSm6EOyNkuykEaeg0nn7S5U8Xk07Gn8O+bNqbOddPD+XRakQm/UtnfGwnJ+e3f8CCa7d/wIpnnu+D/ADx8OvXxiy8Ra9FBtDUVoPSLr5mFbVrUj05B2wTuCeUp+JuPLWshYWlB6NLOtmrspJ9ZqaFCs3NznJOwGMdubFdu/wCBHFdu/wCBHzz/AIPzxej1v2h0GenUqWL6qZISozUSaYqYVipzkAjGcdIPGfE6WvEqz0aaV0r29HzTTqIG1o9ZVOdwTowMEjYLPPPPbv8AgQKdYqvpwPkq/wDKXM8uO03pzbpOGcap0ravZNaO1tVdmRVrqKiI2k6GJ2OCucgnniW/DvianRoW9O4s2apbEGnUoGmAxVWRdeoqwOlyDzBO/sOSNdu/4EL4hu/4En9M/wCH+eLqOH+LK1O+rXjUQwrqqGkrgMipgIVYjDnAORtu23KVuB8Vt6C3NF7Jmta5YoodGr09aBHUsxAIOMghsj36YAuG7/gR/Pbv+BJ/XP8Ag/PFv+K+ONevTIpmlSohlRXYM7FtIZ205CgBQAATzJmKaBkJuG7/AIEf4hu/4Ei8srutJJjNQ5pe0lpWLkagj6cEhtLBSFIDYfGnbck5wAplcXDd/wACH/pGqpBDkaRhdhsAGYY26F3I7FjiVjhu905ZaiT4KoSP3b5OCBofJB04wMb/AKl/+Q7xvg3CFyjBV0E7HYPr0MeykoRk4/Uv8QkZ45cZz5hBGGGAoAZ8ozAAYyQ7/Viee8hXi9dwQ1Ruh2wuSAygnTjJxtvL/OJ51Zq0KqbsjoMZyUYAjIGckcskDPuO8Upni1ZlKmoSHOphtuw0jJ98KPtFJ/OKmVf/2Q==")'
                clr = true;
            } 
            else if (win == 1) {
                document.body.style.backgroundImage = 'url("https://i.ytimg.com/vi/wXQBr14AwXo/maxresdefault.jpg")';
                clr = true;
            } 
            else if (win == 2) {
                document.body.style.backgroundImage = 'url("https://i.ytimg.com/vi/O8dY62xKZWA/maxresdefault.jpg")';
                clr = true;
            }
            else {
                console.log("no winner")
            }
        }         
        }
    }
});