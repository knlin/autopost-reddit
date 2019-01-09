# Autopost for Reddit
Find the best time to post on Reddit. Live demo: https://autopost-reddit.appspot.com/

This app shows a heatmap of recent posts submitted to a subreddit that meet a minimum score threshold (for example, posts on /r/pics within the past two months that gained at least 100 upvotes). Posts are aggregated in half-hour buckets and displayed in your browser's local timezone. The app works by sending SQL queries to a public dataset of Reddit submissions hosted on Google BigQuery and maintained by the Google Cloud Platform team (https://bigquery.cloud.google.com/dataset/fh-bigquery:reddit_posts).

Built using Node.js and React on Google App Engine.

### To-Do:
- Replace results table with D3.js heatmap visualization
- Add CSS
- Add cache for recent queries
- Move timezone conversion from SQL to frontend
- Add Reddit login and automatic post scheduling feature
