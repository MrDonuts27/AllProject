<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>test_x_to_n</title>
<style>
    pre {
      font-size: 24px;
    }
  </style>
</head>
<body>
<script>

function isPrime(number) {
    let output = '<pre>';
    if (number <= 1) {
        return false;
    }
    for (let i = 2; i <= Math.sqrt(number); i++) {
        if (number % i === 0) {
            return false;
        }
    }
    output += line + '<br>';
}
output += '</pre>';
document.body.innerHTML += output;
}


const num1 = 7;
const num2 = 11;
console.log(num1, "is prime?", isPrime(num1)); 
console.log(num2, "is prime?", isPrime(num2)); 
</script>

</body>
</html>
