// ....

// import { Subject } from 'rxjs';

// ....

// private unsubscribe = new Subject();

// export class someComponent OnInit, OnDestroy {

//     constructor(private myService: MyService) { }

//     ngOnInit() {

//         this.myService.someMethod()
//             .pipe(takeUntil(this.unsubscribe))
//             .subscribe(response => ... do something);

//     }

//     ngOnDestroy() {

//         this.unsubscribe.next();
//         this.unsubscribe.complete();
//     }

// .....
