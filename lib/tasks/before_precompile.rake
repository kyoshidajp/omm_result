task :build_client do
  cd "client" do
    sh "npm install"
  end
end

Rake::Task["assets:precompile"].enhance(%i(build_client))