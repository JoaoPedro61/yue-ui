import { task } from 'gulp';
import { exec } from 'child_process';



task('sync:all:git:submodules', (done: (err?: any) => void) => {
  exec('git submodule update --remote --init', (e: any) => {
    if (e) {
      done(e);
      return void 0;
    }
    done();
  });
});
