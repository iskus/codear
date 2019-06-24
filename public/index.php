<!DOCTYPE html>
<html lang="en">
<head>
<?php include_once 'head.htm'; ?>
</head>
<body>
<div class="background"></div>
<div class="schit"></div>
<?php
$names = [];
$videos = glob(__DIR__ . '/media/*.mp4');
foreach ($videos as $video) {
    $arr = explode('/', $video);
    $name = $arr[count($arr) - 1];
    $names[] = $name;
}
$logos = glob(__DIR__ . '/img/logos/*');
array_walk($logos, function (&$logo) {
    $logo = array_reverse(explode('/', $logo))[0];
});
?>
<script>
    logos = <?php echo json_encode($logos); ?>;
    console.log(logos);
</script>
<!-- The video -->
<video autoplay muted loop id="myVideo">
    <source src="media/future12917.mp4<?php //echo $names[array_rand($names)]; ?>" type="video/mp4">
</video>



<!-- header -->
<?php include_once 'header.htm'; ?>
<!-- end of header -->

<!-- socials -->
<?php include_once 'socials.html'; ?>
<!-- end of socials -->


<?php include_once 'home.php'; ?>

<!-- footer -->
<?php include_once 'footer.htm'; ?>
<!-- end of footer -->

<!-- scripts -->

<?php include_once 'scripts.htm'; ?>

<!-- end of scripts -->
</body>
</html>
