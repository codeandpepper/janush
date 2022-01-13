app_id=$1
branch_name=$2
job_id=$3
max_retries=$4
sleep=$5

get_amplify_job_status () {
    echo "$(aws amplify get-job --app-id=$app_id --branch-name=$branch_name --job-id=$job_id --query "job.summary.status"  --output text)"
}

echo sleep in seconds: $sleep
echo max retries: $max_retries

counter=0
until [ $counter -ge $max_retries ]
do
  echo aws amplify get-job --app-id=$app_id --branch-name=$branch_name --job-id=$job_id --query \""job.summary.status"\"  --output text
  status=$(get_amplify_job_status)
  echo $status

  case $status in
    SUCCEED)
      exit 0
      ;;
    PENDING|RUNNING)
      sleep $sleep
      counter=$(expr $counter + 1)
      ;;  
    *)
      exit 1
      ;;
  esac
done

echo ----TIMEOUT----
exit 1