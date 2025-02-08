<?php
// Define the direct URL of the M3U8 file
$m3u8Url = "https://streamcdn55.nayeem-parvez.workers.dev/hungama-kids/video.m3u8";

// Fetch the M3U8 file from the URL
function fetchM3U8($url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_USERAGENT, "PHP M3U8 Fetcher");

    $data = curl_exec($ch);
    curl_close($ch);

    if ($data === false) {
        http_response_code(500);
        die("Error fetching the M3U8 file.");
    }

    return $data;
}

// Output the M3U8 content with the correct header
header("Content-Type: application/vnd.apple.mpegurl");
echo fetchM3U8($m3u8Url);
?>
