# This Rakefile is used for automating anything that needs to be automated for
# the School of CSE website project. Currently there's only a single task here,
# but more can and should be added if needed.

SASS_DIR   = "assets/sass"
CSS_DIR    = "assets/css"
COFFEE_DIR = "assets/coffee"
JS_DIR     = "assets/js"
JS_MAIN    = "main.js"

SERVE_CMD  = "bundle exec jekyll serve --watch"
SASS_CMD   = "sass --watch #{SASS_DIR}:#{CSS_DIR}"
COFFEE_CMD = "coffee --watch --bare --no-header --compile --output #{JS_DIR} #{COFFEE_DIR}"

desc "Alias for 'rake list'"
task :default => [:list]

desc "Serve the site on localhost and watch for SASS changes."
task :serve, [:style] do |task, args|
  args.with_defaults(:style => "compressed")
  serve_process  = Process.spawn(SERVE_CMD)
  sass_process   = Process.spawn(SASS_CMD + " --style #{args.style}")
  coffee_process = Process.spawn(COFFEE_CMD)
  processes = [serve_process, sass_process]
  trap("INT") do
    processes.each do |process|
      Process.kill(9, process) rescue Errno::ESRCH
    end
    exit 0
  end
  processes.each do |process|
    Process.wait(process)
  end
end

desc "List all rake tasks"
task :list do
  system "rake -T"
end

