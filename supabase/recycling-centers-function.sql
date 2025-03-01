-- Drop the existing function if it exists
DROP FUNCTION IF EXISTS find_nearest_recycling_centers_by_coords;

-- Create the function with correct return types
CREATE OR REPLACE FUNCTION find_nearest_recycling_centers_by_coords(
  search_lat DECIMAL,
  search_lng DECIMAL,
  limit_count INTEGER DEFAULT 3
)
RETURNS TABLE (
  id INTEGER,
  site_name VARCHAR(255),  -- Using VARCHAR instead of TEXT
  address VARCHAR(255),    -- Using VARCHAR instead of TEXT
  post_code VARCHAR(10),   -- Using VARCHAR instead of TEXT
  location_type VARCHAR(100),
  site_type VARCHAR(100),
  latitude DECIMAL,
  longitude DECIMAL,
  distance_meters DOUBLE PRECISION,  -- Changed from DECIMAL to DOUBLE PRECISION
  accepts_mixed_glass BOOLEAN,
  accepts_paper BOOLEAN,
  accepts_textiles BOOLEAN,
  accepts_small_electrical BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    rc.id,
    rc.site_name,
    rc.address,
    rc.post_code,
    rc.location_type,
    rc.site_type,
    rc.latitude,
    rc.longitude,
    -- Calculate distance in meters
    ST_Distance(
      ST_SetSRID(ST_MakePoint(search_lng, search_lat), 4326)::geography,
      ST_SetSRID(ST_MakePoint(rc.longitude, rc.latitude), 4326)::geography
    ) AS distance_meters,
    rc.accepts_mixed_glass,
    rc.accepts_paper,
    rc.accepts_textiles,
    rc.accepts_small_electrical
  FROM 
    recycling_centres rc
  WHERE 
    rc.latitude IS NOT NULL AND rc.longitude IS NOT NULL
  ORDER BY 
    ST_Distance(
      ST_SetSRID(ST_MakePoint(search_lng, search_lat), 4326)::geography,
      ST_SetSRID(ST_MakePoint(rc.longitude, rc.latitude), 4326)::geography
    )
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql; 