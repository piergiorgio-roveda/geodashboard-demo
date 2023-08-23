<script>
  $(document).ready(function() {
    console.log('dashboard ready!');
    $('.sample-timer').html('---');
    // Set the date we're counting down to
    var countDownDate = new Date("Jan 5, 2022 15:37:25").getTime();    
    var x = setInterval(function() {

      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the element with id="demo"
      $('.sample-timer').html(days + "d " + hours + "h "
      + minutes + "m " + seconds + "s ");

    }, 1000);

  }); //$(document).ready
</script>