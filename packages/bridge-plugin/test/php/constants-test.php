<?php
/**
 * Every WPSYNC_* constant the bridge uses must be defined: in the generated protocol.php or by
 * the plugin itself. php -l can't catch a missing one; it only fails when that line runs.
 * Run with: php test/php/constants-test.php
 */

$dir     = __DIR__ . '/../../wpsync-bridge';
$defined = array();
$used    = array();
foreach ( new RecursiveIteratorIterator( new RecursiveDirectoryIterator( $dir, FilesystemIterator::SKIP_DOTS ) ) as $file ) {
	if ( 'php' !== $file->getExtension() ) {
		continue;
	}
	$source = file_get_contents( $file->getPathname() );
	preg_match_all( '/\bconst\s+(WPSYNC_[A-Z0-9_]+)\s*=|define\(\s*\'(WPSYNC_[A-Z0-9_]+)\'/', $source, $m );
	$defined = array_merge( $defined, array_filter( $m[1] ), array_filter( $m[2] ) );
	preg_match_all( '/\b(WPSYNC_[A-Z0-9_]+)\b/', $source, $m );
	foreach ( $m[1] as $name ) {
		$used[ $name ][] = basename( $file->getPathname() );
	}
}
$missing = array_diff( array_keys( $used ), $defined );
if ( $missing ) {
	foreach ( $missing as $name ) {
		fwrite( STDERR, "$name is used in " . implode( ', ', array_unique( $used[ $name ] ) ) . " but never defined\n" );
	}
	exit( 1 );
}
echo 'constants: ' . count( $used ) . " used, all defined\n";
