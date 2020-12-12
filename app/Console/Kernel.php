<?php

namespace App\Console;

use App\Console\Commands\InstallApp;
use App\Console\Commands\ResetDemoApp;
use App\Console\Commands\ListingsCron;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        InstallApp::class,
        // this is just for the demo, you can remove this on your application
        ResetDemoApp::class,
        ListingsCron::class,
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // $schedule->call('demo:reset')->hourly();
        $schedule->command('listings:cron')->everyMinute();
    }

    /**
     * Register the Closure based commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');
        require base_path('routes/console.php');
    }
}
