<?php

require __DIR__.'./vendor/autoload.php';
use Spipu/Html2Pdf/Html2Pdf;

$html2pdf= new  Html2Pdf();
$html2pdf-> writeHtml('<h1>Hola Mundo!! desde html2pdf</h1>');
$html2pdf->output();



?>