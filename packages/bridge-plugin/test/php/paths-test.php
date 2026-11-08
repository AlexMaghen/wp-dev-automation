<?php
/**
 * Checks the PHP path rules against packages/protocol/test-vectors/paths.json, which the
 * TypeScript implementation generates. Run with: php test/php/paths-test.php
 */

define( 'ABSPATH', __DIR__ . '/' );
function untrailingslashit( $value ) {
	return rtrim( $value, '/\\' );
}
require __DIR__ . '/../../wpsync-bridge/includes/protocol.php';
require __DIR__ . '/../../wpsync-bridge/includes/class-wpsync-paths.php';

$vectors  = json_decode( file_get_contents( __DIR__ . '/../../../protocol/test-vectors/paths.json' ), true );
$failures = array();

foreach ( $vectors['excluded'] as $case ) {
	if ( Wpsync_Paths::is_excluded( $case['path'] ) !== $case['excluded'] ) {
		$failures[] = "is_excluded({$case['path']}) should be " . var_export( $case['excluded'], true );
	}
}
foreach ( $vectors['order'] as $case ) {
	if ( Wpsync_Paths::compare( $case['a'], $case['b'] ) !== $case['cmp'] ) {
		$failures[] = "compare({$case['a']}, {$case['b']}) should be {$case['cmp']}";
	}
}
foreach ( $vectors['safe'] as $case ) {
	if ( Wpsync_Paths::is_safe_relative( $case['path'] ) !== $case['safe'] ) {
		$failures[] = "is_safe_relative({$case['path']}) should be " . var_export( $case['safe'], true );
	}
}

$total = count( $vectors['excluded'] ) + count( $vectors['order'] ) + count( $vectors['safe'] );
if ( $failures ) {
	fwrite( STDERR, implode( "\n", $failures ) . "\n" );
	exit( 1 );
}
echo "paths: {$total} cases pass\n";
