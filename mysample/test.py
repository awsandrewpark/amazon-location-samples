import boto3
import json

client = boto3.client(
    'location',
    region_name="us-east-1",
    aws_access_key_id='ASIAZDQFBJ4QLIQTV2ZF',
    aws_secret_access_key='dMklOUMS5ccgmNvi6sWOnM9RI9XfgWveHw1HQoK+',
    aws_session_token='IQoJb3JpZ2luX2VjEO7//////////wEaCXVzLWVhc3QtMSJHMEUCIEK+t79E32y+itnK1P5JXLB6e4MeIMicTLixMAagrHCAAiEAg96wIGFk7v8UymPO1irUs7nnvVc7oPO2JdbqDtA1J54qnwMI5///////////ARABGgw2MjYwMDIwNTQ5NDQiDDslF+ITgqfVyuNMhirzAlE9C+ZAb5J1k7yy7m/WKD7lquFGgQV+yCXJIR2I+H52iwMjzFpMKuZJRXxBvctSroKgZpJ4Aep0thfShlekMBev5FoDvSd82cp2Splhqjjfm+h01XYiEm3O030zcMd/M7vx7R1eLZO/nVDRcEkMY/D9PCPVsRdgMcUlm2q+Kffa0HfK7xcQm8RHtgLt7N+U4aTrP842WKUvVodskSmEf88LjtDBWa49dpriQDcxR6yVfdVMMO2wCD9/RyjG+MXfkiTLqpIACm56HTKx46wSTskoWcbsQEYWtnS2kuykhbJLIYfKFGMZPuBZMBilsyK16nnpp+MG7jVI0NjWwAu7KBhF2LvGreiJ5Ow8d67wKey7mBHtNkC6v3rqyIApvMbGm+PFJEbmWMa9IbOLLgFInbQ9wnh96jIs1DZSCabjSklHj/TXDwX3W7W3FxrD744JBlDy/dGEAVrzhDeOCvB7LQHRU9hUiOtKspWK4lk9dvveEhXNMIXInYEGOqYB/PVAtIn6tNaOZAkeCvfSQpTWEZeAklrUFNQqd4F5RJ/EBbQ6HyHc+86K3VM0rRBiSTlSYJuKN4MEG6hbJaoJE0eRxgZMehDjFgSKjGvSebRp1+y0f+WcLH3zIMgbEZBvy07AkCl0OAEhsEyZ9uIQ1K7wOCnsUegBF04I6xmPZmnn2GjFlOnN3y/bFKkwMLmMU8wklpSQE4Al+i9NYx1xdxbWFQTOlA=='
)

#response = client.create_place_index(
#    DataSource='Esri',
#    DataSourceConfiguration={
#        'IntendedUse': 'SingleUse'
#    },
#    Description='test place index',
#    IndexName='myplaceindex',
#    PricingPlan='RequestBasedUsage'
#)

#response = client.search_place_index_for_text(
#    IndexName='myplaceindex',
#    BiasPosition=[
#        43.6418,
#        79.3891
#    ],
#    Text="1 Bluejays Way"
#)

response = client.search_place_index_for_position(
    IndexName='myplaceindex',
    Position=[
        -79.39,
        43.6416
    ]
)

print(json.dumps(response, indent=2))

# Sample output
# {
#   "ResponseMetadata": {
#     "RequestId": "3d5c283d-cdb1-4650-b889-2c889ec72725",
#     "HTTPStatusCode": 200,
#     "HTTPHeaders": {
#       "date": "Sat, 13 Feb 2021 06:10:49 GMT",
#       "content-type": "application/json",
#       "content-length": "366",
#       "connection": "keep-alive",
#       "x-amzn-requestid": "3d5c283d-cdb1-4650-b889-2c889ec72725",
#       "x-amzn-remapped-x-amzn-requestid": "3d5c283d-cdb1-4650-b889-2c889ec72725",
#       "access-control-allow-origin": "*",
#       "x-amz-apigw-id": "aq4IaHabIAMFZUg=",
#       "access-control-expose-headers": "x-amzn-errortype,x-amzn-requestid,x-amzn-errormessage,x-amzn-trace-id,x-amzn-requestid,x-amz-apigw-id,date",
#       "x-amzn-trace-id": "Root=1-60276d68-79017e8e653e991b57a0eb0c"
#     },
#     "RetryAttempts": 0
#   },
#   "Results": [
#     {
#       "Place": {
#         "Country": "CAN",
#         "Geometry": {
#           "Point": [
#             -79.39103994490162,
#             43.641960045156054
#           ]
#         },
#         "Label": "Blue Jays Way, Toronto, Ontario, M5V, CAN",
#         "Municipality": "Toronto",
#         "Neighborhood": "Waterfront Communities-the Island",
#         "PostalCode": "M5V",
#         "Region": "Ontario",
#         "SubRegion": "Toronto"
#       }
#     }
#   ],
#   "Summary": {
#     "DataSource": "Esri",
#     "MaxResults": 50,
#     "Position": [
#       -79.39,
#       43.6416
#     ]
#   }
# }


