#!/bin/bash
echo "Đang chạy kịch bản sinh log cho hệ thống..."
for i in {1..20}
do
   curl -s http://localhost/ > /dev/null
   echo "Gửi request lần $i thành công!"
   sleep 0.5
done
echo "Hoàn thành kịch bản sinh log!"
