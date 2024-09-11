build: convert join

convert:
	tsc

join:
	tic80 --fs="." --cmd="load GBJam12.png & import code bin/out.js & save & run"
